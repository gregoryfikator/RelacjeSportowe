using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using RelacjeSportowe.Services;
using System.Threading.Tasks;

namespace RelacjeSportowe.Web.Middlewares
{
    public class OptionsMiddleware
    {
        private readonly RequestDelegate next;

        private readonly string[] origins;

        public OptionsMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            this.next = next;
            this.origins = configuration.GetSection(Constants.Configuration.AllowedOrigins).Get<string[]>();
        }

        public async Task Invoke(HttpContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", origins);
            context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Accept-Encoding, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
            context.Response.Headers.Add("Access-Contol-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");

            await next(context);
        }
    }
}
