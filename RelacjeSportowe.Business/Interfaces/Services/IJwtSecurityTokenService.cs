using RelacjeSportowe.DataAccess.Dtos;
using System.IdentityModel.Tokens.Jwt;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IJwtSecurityTokenService
    {
        string GenerateToken(AccessTokenGenerationData accessTokenGenerationDto);

        string GenerateRefreshToken();

        string RegenerateExpiredToken(JwtSecurityToken expiredJwtSecurityToken);
    }
}
