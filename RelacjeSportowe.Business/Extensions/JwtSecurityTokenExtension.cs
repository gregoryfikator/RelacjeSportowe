using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

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

        public static string GetEmail(this JwtSecurityToken jwtSecurityToken)
        {
            return jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.Email).Value;
        }

        public static string GetFirstName(this JwtSecurityToken jwtSecurityToken)
        {
            return jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.FirstName).Value;
        }

        public static string GetLastName(this JwtSecurityToken jwtSecurityToken)
        {
            return jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.LastName).Value;
        }

        public static AuthorizationRole GetAuthorizationRole(this JwtSecurityToken jwtSecurityToken)
        {
            return Enum.Parse<AuthorizationRole>(jwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.Role).Value);
        }
    }
}
