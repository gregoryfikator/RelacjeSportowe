using Microsoft.AspNetCore.Builder;
using RelacjeSportowe.Web.Middlewares;

namespace RelacjeSportowe.Web.Extensions
{
    public static class JwtValidationMiddlewareExtension
    {
        public static IApplicationBuilder UseJwtTokenValidationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtValidationMiddleware>();
        }
    }
}
