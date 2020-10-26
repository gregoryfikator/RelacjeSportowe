using Microsoft.IdentityModel.Tokens;
using RelacjeSportowe.Business.Configurations;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Models;
using RelacjeSportowe.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
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

        public string GenerateToken(AccessTokenGenerationData accessTokenGenerationDto)
        {
            var claims = new ClaimsIdentity(
                new[]
                {
                    new Claim(Constants.JwtToken.Claims.Email, accessTokenGenerationDto.Email.ToString()),
                    new Claim(Constants.JwtToken.Claims.RefreshToken, accessTokenGenerationDto.RefreshToken),
                    new Claim(Constants.JwtToken.Claims.UserId, accessTokenGenerationDto.UserId.ToString()),
                    new Claim(Constants.JwtToken.Claims.Role, accessTokenGenerationDto.AuthorizationRole.ToString())
                });

            return CreateNewToken(claims);
        }

        public string RegenerateToken(JwtSecurityToken expiredJwtSecurityToken, User user)
        {
            var authorizationRoleChanged = ValidateAuthorizationRole(expiredJwtSecurityToken, user);

            var claims = new ClaimsIdentity(
                new[]
                {
                    new Claim(Constants.JwtToken.Claims.Email, expiredJwtSecurityToken.GetEmail()),
                    new Claim(Constants.JwtToken.Claims.RefreshToken, expiredJwtSecurityToken.GetRefreshToken()),
                    new Claim(Constants.JwtToken.Claims.UserId, expiredJwtSecurityToken.GetUserId().ToString()),
                    new Claim(Constants.JwtToken.Claims.Role, authorizationRoleChanged ? user.AuthorizationRole.ToString() : expiredJwtSecurityToken.GetAuthorizationRole().ToString())
                });

            return CreateNewToken(claims);
        }

        public string GenerateRefreshToken()
        {
            var rngProvider = new RNGCryptoServiceProvider();

            var bytesArray = new byte[Constants.JwtToken.Settings.RefreshTokenLengthInBytes];

            rngProvider.GetBytes(bytesArray);

            return Convert.ToBase64String(bytesArray);
        }

        public bool ValidateAuthorizationRole(JwtSecurityToken jwtToken, User user)
        {
            var authorizationRole = jwtToken.GetAuthorizationRole();
            return authorizationRole == user.AuthorizationRole;
        }

        public bool ValidateRefreshToken(JwtSecurityToken jwtToken, User user)
        {
            var refreshToken = jwtToken.GetRefreshToken();
            return refreshToken == Encoding.Default.GetString(user.RefreshToken);
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
