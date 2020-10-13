using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RelacjeSportowe.Business.Configurations;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.Business.Providers;
using RelacjeSportowe.Business.Services;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.Services;
using RelacjeSportowe.Web.Middlewares;

namespace RelacjeSportowe.Web
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
            services.AddCors(options =>
            {
                var allowedOrigins = Configuration.GetSection(Constants.Configuration.AllowedOrigins).Get<string[]>();

                options.AddPolicy(Constants.CorsPolicies.BasicPolicy, builder => builder
                .WithOrigins(allowedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString(Constants.Configuration.DefaultConnection));
            });

            services.AddSingleton(Configuration.GetSection("JwtAuthConfiguration").Get<JwtAuthConfiguration>());
            services.AddSingleton(Configuration);

            services.AddScoped<IBaseUtilitiesProvider, BaseUtilitiesProvider>();
            services.AddScoped<IUserProvider, UserProvider>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPasswordService, PasswordService>();
            services.AddScoped<IJwtSecurityTokenService, JwtSecurityTokenService>();

            services.AddAutoMapper(x => x.AddProfile<AutoMapperProfileProvider>(), typeof(Startup));

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build());
            });

            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(Constants.CorsPolicies.BasicPolicy);

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseAuthentication();
            app.UseJwtTokenValidationMiddleware();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
