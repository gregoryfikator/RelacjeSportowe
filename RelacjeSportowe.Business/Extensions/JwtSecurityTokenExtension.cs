using RelacjeSportowe.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace RelacjeSportowe.Business.Extensions
{
    public static class JwtSecurityTokenExtension
    {
        public static int GetUserId(this JwtSecurityToken jwtSecurityToken)
        {
            return int.Parse(jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.UserId).Value);
        }

        public static string GetRefreshToken(this JwtSecurityToken jwtSecurityToken)
        {
            return jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.RefreshToken).Value;
        }
    }
}
