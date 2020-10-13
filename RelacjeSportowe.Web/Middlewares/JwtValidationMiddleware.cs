using AutoMapper.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace RelacjeSportowe.Web.Middlewares
{
    public class JwtValidationMiddleware
    {
        private readonly RequestDelegate next;

        public JwtValidationMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext,
            IUserProvider userProvider,
            IJwtSecurityTokenService jwtSecurityTokenService)
        {

            var rawJwt = httpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (rawJwt != null)
            {
                var jwtToken = new JwtSecurityToken(rawJwt.Split(' ')[1]);

                if (userProvider.ValidateRefreshToken(jwtToken))
                {
                    if (jwtToken.ValidTo < DateTime.UtcNow)
                    {
                        var jsonString = JsonConvert.SerializeObject(new { jwtToken = jwtSecurityTokenService.RegenerateExpiredToken(jwtToken) });

                        httpContext.Response.ContentType = "application/json";
                        httpContext.Response.Headers.Add("Token-Expired", "true");
                        httpContext.Response.StatusCode = 475; //new access token

                        await httpContext.Response.WriteAsync(jsonString);

                        return;
                    }

                    userProvider.SetCurrentUser(jwtToken);
                }
                else
                {
                    httpContext.Response.StatusCode = 474; // redirect to login page
                    await httpContext.Response.WriteAsync(string.Empty);

                    return;
                }
            }

            await next(httpContext);
        }
    }

    public static class JwtValidationMiddlewareExtension
    {
        public static IApplicationBuilder UseJwtTokenValidationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtValidationMiddleware>();
        }
    }
}
