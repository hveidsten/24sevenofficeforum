using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json;
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


			services.AddDbContext<_24hOfficeforumContext>();
			services.AddMvc();
			services.AddCors();
			//services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
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
				//options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
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
				//options.AddPolicy("admin", policy => policy.RequireClaim("admin"));
			
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

			app.UseMvc();
			//app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod());
			app.UseCors(builder => builder.WithOrigins("http://localhost:62152"));
			app.UseCors("Delete");
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "24sevenOfficeforum V1");
			});
		}

	}
}
