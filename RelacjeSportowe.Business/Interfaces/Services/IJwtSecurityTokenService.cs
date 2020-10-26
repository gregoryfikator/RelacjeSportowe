using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Models;
using System.IdentityModel.Tokens.Jwt;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IJwtSecurityTokenService
    {
        string GenerateToken(AccessTokenGenerationData accessTokenGeneration);

        string GenerateRefreshToken();

        string RegenerateToken(JwtSecurityToken expiredJwtSecurityToken, User user);

        bool ValidateAuthorizationRole(JwtSecurityToken jwtToken, User user);

        bool ValidateRefreshToken(JwtSecurityToken jwtToken, User user);
    }
}
