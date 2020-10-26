using RelacjeSportowe.DataAccess.Models;
using System.IdentityModel.Tokens.Jwt;

namespace RelacjeSportowe.Business.Interfaces.Providers
{
    public interface IUserProvider
    {
        User CurrentUser { get; }

        void SetCurrentUser(JwtSecurityToken jwtToken);
    }
}
