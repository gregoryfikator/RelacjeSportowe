using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RelacjeSportowe.Business.Configurations;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Enums;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RelacjeSportowe.Business.Services
{
    public class JwtSecurityTokenService : IJwtSecurityTokenService
    {
        private readonly JwtAuthConfiguration jwtAuthConfiguration;
        private readonly JwtSecurityTokenHandler jwtSecurityTokenHandler;

        public JwtSecurityTokenService(JwtAuthConfiguration jwtAuthConfiguration)
        {
            this.jwtAuthConfiguration = jwtAuthConfiguration;
            this.jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        }

        public string GenerateToken(AccessTokenGenerationDto accessTokenGenerationDto)
        {
            var claims = new ClaimsIdentity(
                new[]
                {
                    new Claim(Constants.JwtToken.Claims.UserId, accessTokenGenerationDto.UserId.ToString()),
                    new Claim(Constants.JwtToken.Claims.RefreshToken, accessTokenGenerationDto.RefreshToken),
                    new Claim(Constants.JwtToken.Claims.IdentityProvider, accessTokenGenerationDto.IdentityProvider.ToString())
                });

            switch (accessTokenGenerationDto.IdentityProvider)
            {
                case IdentityProvider.Facebook:
                    break;
                case IdentityProvider.Google:
                    break;
                default:
                    break;
            }

            return CreateNewToken(claims);
        }

        public string GenerateRefreshToken()
        {
            RNGCryptoServiceProvider rngProvider = new RNGCryptoServiceProvider();

            var bytesArray = new byte[Constants.JwtToken.Settings.RefreshTokenLengthInBytes];

            rngProvider.GetBytes(bytesArray);

            return Convert.ToBase64String(bytesArray);
        }

        public string RegenerateExpiredToken(JwtSecurityToken expiredJwtSecurityToken)
        {
            var userId = expiredJwtSecurityToken.GetUserId().ToString();
            var refreshToken = expiredJwtSecurityToken.GetRefreshToken();
            var identityProvider = expiredJwtSecurityToken.Claims.First(x => x.Type == Constants.JwtToken.Claims.IdentityProvider);

            var claims = new ClaimsIdentity(
                new[]
                {
                    new Claim(Constants.JwtToken.Claims.UserId, userId),
                    new Claim(Constants.JwtToken.Claims.RefreshToken, refreshToken),
                    new Claim(Constants.JwtToken.Claims.IdentityProvider, identityProvider.ToString())
                });

            //switch (identityProvider)
            //{
            //    case IdentityProvider.Facebook:
            //        break;
            //    case IdentityProvider.Google:
            //        break;
            //    default:
            //        break;
            //}

            return CreateNewToken(claims);
        }

        private string CreateNewToken(ClaimsIdentity claims)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(Constants.JwtToken.Settings.TokenProlongationTimeInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtAuthConfiguration.Secret)), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);

            return jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}
