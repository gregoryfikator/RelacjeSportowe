﻿using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Dtos.Requests;
using RelacjeSportowe.Business.Dtos.Responses;
using RelacjeSportowe.Business.Enums;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IPasswordService passwordService;
        private readonly IJwtSecurityTokenService jwtSecurityTokenService;

        public UserService(IBaseUtilitiesProvider baseUtilitiesProvider,
            IPasswordService passwordService,
            IJwtSecurityTokenService jwtSecurityTokenService) : base(baseUtilitiesProvider)
        {
            this.passwordService = passwordService;
            this.jwtSecurityTokenService = jwtSecurityTokenService;
        }

        public UserDto GetUser()
        {
            return this.CurrentUser;
        }

        public UserDto GetUser(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserAsync(string username)
        {
            return await this.Context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public UserDto GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest)
        {
            var user = await this.GetUserAsync(loginUserRequest.Username);

            this.passwordService.CheckPassword(loginUserRequest.Password, user.HashedPassword);

            user.LastLoginDate = DateTime.UtcNow;

            await this.Context.SaveChangesAsync();

            var accessTokenGenerationDto = new AccessTokenGenerationDto
            {
                UserId = user.Id,
                IdentityProvider = loginUserRequest.IdentityProvider,
                RefreshToken = Encoding.Default.GetString(user.RefreshToken)
            };

            var loginUserResponse = new LoginUserResponse
            {
                AccessToken = this.jwtSecurityTokenService.GenerateToken(accessTokenGenerationDto),
                User = Mapper.Map<User, UserDto>(user)
            };

            return loginUserResponse;
        }

        public async Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest)
        {
            var user = Mapper.Map<User>(registerUserRequest);

            if (registerUserRequest.IdentityProvider == IdentityProvider.Default)
            {
                user.HashedPassword = this.passwordService.HashPassword(registerUserRequest.Password);
            }

            var refreshToken = this.jwtSecurityTokenService.GenerateRefreshToken();
            user.RefreshToken = Encoding.Default.GetBytes(refreshToken);

            await Context.Users.AddAsync(user);

            await Context.SaveChangesAsync();

            var accessTokenGenerationDto = new AccessTokenGenerationDto
            {
                UserId = user.Id,
                IdentityProvider = registerUserRequest.IdentityProvider,
                RefreshToken = refreshToken
            };

            var registerUserResponse = new RegisterUserResponse
            {
                AccessToken = this.jwtSecurityTokenService.GenerateToken(accessTokenGenerationDto),
                User = Mapper.Map<User, UserDto>(user)
            };

            return registerUserResponse;
        }
    }
}