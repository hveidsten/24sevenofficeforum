using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.AspNetCore.Swagger;
using _24SevenOfficeForum.Models;
using _24SevenOfficeForum.Utility;

namespace _24SevenOfficeForum
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().AddJsonOptions(
			options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
				);

			services.AddMvc().AddJsonOptions(
				options => options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore
			);

			services.AddDbContext<_24hOfficeforumContext>();
			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy",
					builder => builder
						.WithOrigins("http://localhost:3000")
						.WithHeaders("Accept", "content-type", "Origin", "X-custom-header")
						.WithMethods("POST", "PUT", "DELETE", "PATCH", "OPTIONS")
						.AllowCredentials());
			});
			services.Configure<MvcOptions>(options =>
			{
				options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
			});
			services.AddMvc();

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new Info
				{
					Version = "v1",
					Title = "24sevenOfficeforum",
					Description = "24SevenOfficeForumAPI",
					TermsOfService = "None",
					Contact = new Contact() { Name = "24sevenOffice", Email = "post@bademailprovider.com", Url = "https://24sevenoffice.com/no/" }
				});

				var basePath = PlatformServices.Default.Application.ApplicationBasePath;
				var xmlPath = Path.Combine(basePath, "24sevenOffice.xml");
				c.IncludeXmlComments(xmlPath);
			});

			string domain = $"https://{Configuration["Auth0:Domain"]}/";

			// add Authentication Services
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddJwtBearer(options =>
			{
				options.Audience = Configuration["Auth0:Audience"];
				options.Authority = domain;
				options.Events = new JwtBearerEvents
				{
					OnTokenValidated = context =>
					{
						if (context.SecurityToken is JwtSecurityToken token)
						{
							if (context.Principal.Identity is ClaimsIdentity identity)
							{
								identity.AddClaim(new Claim("access_token", token.RawData));
							}
						}
						return Task.FromResult(0);
					}
				};
			});

			services.AddAuthorization(options =>
			{
				options.AddPolicy("read:questions", policy => policy.Requirements.Add(new HasScopeRequirements("read:questions", domain)));
			});

			// register the scope authorization handler
			services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();
			else
				app.UseExceptionHandler("/Home/Error");

			app.UseCookiePolicy();
			app.UseStaticFiles();
			app.UseAuthentication();

			app.UseCors("CorsPolicy");
			app.UseMvc();

			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "24sevenOfficeforum V1");
			});
		}

	}
}
