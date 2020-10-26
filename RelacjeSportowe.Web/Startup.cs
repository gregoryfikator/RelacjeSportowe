using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using RelacjeSportowe.Business.Configurations;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.Business.Interfaces.Validators;
using RelacjeSportowe.Business.Providers;
using RelacjeSportowe.Business.Services;
using RelacjeSportowe.Business.Validators;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.Services;
using RelacjeSportowe.Web.Extensions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

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

                options.AddPolicy(Constants.CorsPolicies.BasicPolicy, builder =>
                {
                    builder.WithOrigins(allowedOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString(Constants.Configuration.DefaultConnection));
            });

            ConfigureBasicServices(services);
            ConfigureBusinessServices(services);
            ConfigureValidationServices(services);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("User", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .RequireRole(new[]
                    {
                        AuthorizationRole.User.ToString(),
                        AuthorizationRole.Moderator.ToString(),
                        AuthorizationRole.Administrator.ToString()
                    })
                    .Build());

                options.AddPolicy("Moderator", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .RequireRole(new[]
                    {
                        AuthorizationRole.Moderator.ToString(),
                        AuthorizationRole.Administrator.ToString()
                    })
                    .Build());

                options.AddPolicy("Administrator", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .RequireRole(AuthorizationRole.Administrator.ToString())
                    .Build());
            });

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
            })

                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey
                        (
                            Encoding.ASCII.GetBytes(Configuration.GetSection(Constants.Configuration.JwtAuthConfiguration).Get<JwtAuthConfiguration>().Secret)
                        ),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = false
                    };

                    x.Events = new JwtBearerEvents()
                    {
                        OnTokenValidated = (context) =>
                        {
                            if (context.SecurityToken is JwtSecurityToken token)
                            {
                                if (context.Principal.Identity is ClaimsIdentity claims)
                                {
                                    claims.AddClaim(new Claim("access_token", token.RawData));
                                }
                            }

                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = (context) =>
                        {
                            var error = JsonConvert.SerializeObject(new { Error = context.Exception.ToString() });
                            context.Response.ContentType = "application/json";
                            context.Response.StatusCode = Constants.StatusCodes.RedirectToLoginPage;
                            return context.Response.WriteAsync(error);
                        }
                    };

                });

            services.AddControllersWithViews(); //.AddMvcCore().AddAuthorization();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Relacje Sportowe API", Version = "v1" });
            });

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

            app.UseSwagger();

            app.UseCors(Constants.CorsPolicies.BasicPolicy);

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();
            app.UseJwtTokenValidationMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Get}/{id?}");
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

        private void ConfigureBasicServices(IServiceCollection services)
        {
            services.AddAutoMapper(x => x.AddProfile<AutoMapperProfileProvider>(), typeof(Startup));

            services.AddSingleton(Configuration.GetSection(Constants.Configuration.JwtAuthConfiguration).Get<JwtAuthConfiguration>());
            services.AddSingleton(Configuration);

            services.AddScoped<IBaseUtilitiesProvider, BaseUtilitiesProvider>();
            services.AddScoped<IUserProvider, UserProvider>();

            //services.AddScoped(typeof(IBaseService), typeof(BaseService));
        }

        private void ConfigureBusinessServices(IServiceCollection services)
        {
            services.AddScoped<IJwtSecurityTokenService, JwtSecurityTokenService>();
            services.AddScoped<IPasswordService, PasswordService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUserService, UserService>();
        }

        private void ConfigureValidationServices(IServiceCollection services)
        {
            //services.AddScoped(typeof(IBaseValidationService), typeof(BaseValidationService));
            services.AddScoped<IUserValidationService, UserValidationService>();
        }
    }
}
