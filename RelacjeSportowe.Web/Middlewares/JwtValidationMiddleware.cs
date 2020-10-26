using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Models;
using RelacjeSportowe.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
            IJwtSecurityTokenService jwtSecurityTokenService,
            IUserService userService)
        {
            var rawJwt = httpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (rawJwt != null)
            {
                var jwtToken = new JwtSecurityToken(rawJwt.Split(' ')[1]);

                var email = jwtToken.GetEmail();

                var user = await userService.GetUserByEmailAsync(email);

                if (jwtSecurityTokenService.ValidateRefreshToken(jwtToken, user))
                {
                    var tokenExpired = jwtToken.ValidTo < DateTime.UtcNow;
                    var authorizationRoleChanged = !jwtSecurityTokenService.ValidateAuthorizationRole(jwtToken, user);
                    if (tokenExpired || authorizationRoleChanged)
                    {
                        var jsonString = JsonConvert.SerializeObject(new { jwtToken = jwtSecurityTokenService.RegenerateToken(jwtToken, user) });

                        httpContext.Response.ContentType = "application/json";
                        httpContext.Response.Headers.Add("Token-Expired", "true");
                        httpContext.Response.StatusCode = Constants.StatusCodes.NewAccessTokenCreated;

                        await httpContext.Response.WriteAsync(jsonString);

                        return;
                    }

                    userProvider.SetCurrentUser(jwtToken);
                }
                else
                {
                    httpContext.Response.StatusCode = Constants.StatusCodes.RedirectToLoginPage;
                    await httpContext.Response.WriteAsync(string.Empty);

                    return;
                }
            }

            await next(httpContext);
        }
    }
}
