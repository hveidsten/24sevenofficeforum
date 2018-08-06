using System.IO;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
			services.AddDbContext<_24hOfficeforumContext>();
			services.AddMvc();
			services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new Info
				{
					Version = "v1",
					Title = "24sevenOfficeforum",
					Description = "My First ASP.NET Core 2.0 Web API",
					TermsOfService = "None",
					Contact = new Contact() { Name = "24sevenOffice", Email = "post@bademailprovider.com", Url = "https://24sevenoffice.com/no/" }
				});

				var basePath = PlatformServices.Default.Application.ApplicationBasePath;
				var xmlPath = Path.Combine(basePath, "24sevenOffice.xml");
				c.IncludeXmlComments(xmlPath);
			});

			
			string domain = $"https://{Configuration["Auth0:Domain"]}/";
			// 1. Add Authentication Services
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddJwtBearer(options =>
			{
				options.Audience = "localhost:62152";
				options.Authority = "https://24hofficeforum.eu.auth0.com/";
			});

			services.AddAuthorization(options =>
			{
				options.AddPolicy("post:questions", policy => policy.Requirements.Add(new HasScopeRequirements("post:questions", domain)));
				options.AddPolicy("read:questions", policy => policy.Requirements.Add(new HasScopeRequirements("read:questions", domain)));
				options.AddPolicy("administrator", policy => policy.Requirements.Add(new HasScopeRequirements("administrator", domain)));
				options.AddPolicy("superuser", policy => policy.Requirements.Add(new HasScopeRequirements("superuser", domain)));
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
			app.UseCors("AllowAll");
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "24sevenOfficeforum V1");
			});
		}

	}
}
