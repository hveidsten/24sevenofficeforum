using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using _24SevenOfficeForum.Models;

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
			//services.AddSwaggerGen(c =>
			//{
			//	c.SwaggerDoc("v1", new Info
			//	{
			//		Version = "v1",
			//		Title = "24sevenOfficeforum",
			//		Description = "My First ASP.NET Core 2.0 Web API",
			//		TermsOfService = "None",
			//		Contact = new Contact() { Name = "24sevenOffice", Email = "post@bademailprovider.com", Url = "https://24sevenoffice.com/no/" }
			//	});
			//
			//	var basePath = PlatformServices.Default.Application.ApplicationBasePath;
			//	var xmlPath = Path.Combine(basePath, "24sevenOffice.xml");
			//	c.IncludeXmlComments(xmlPath);
			//});			
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
	        app.UseCors("AllowAll");
			//app.UseSwagger();
			//app.UseSwaggerUI(c =>
			//{
			//	c.SwaggerEndpoint("/swagger/v1/swagger.json", "24sevenOfficeforum V1");
			//});
		}

    }
}
