using RelacjeSportowe.Business.Dtos;
using System.IdentityModel.Tokens.Jwt;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IJwtSecurityTokenService
    {
        string GenerateToken(AccessTokenGenerationDto accessTokenGenerationDto);

        string GenerateRefreshToken();

        string RegenerateExpiredToken(JwtSecurityToken expiredJwtSecurityToken);
    }
}
