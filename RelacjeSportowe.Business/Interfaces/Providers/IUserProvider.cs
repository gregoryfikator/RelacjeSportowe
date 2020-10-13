using RelacjeSportowe.Business.Dtos;
using System.IdentityModel.Tokens.Jwt;

namespace RelacjeSportowe.Business.Interfaces.Providers
{
    public interface IUserProvider
    {
        UserDto CurrentUser { get; }

        void SetCurrentUser(JwtSecurityToken jwtToken);

        bool ValidateRefreshToken(JwtSecurityToken jwtToken);
    }
}
