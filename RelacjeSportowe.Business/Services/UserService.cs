using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.Business.Interfaces.Validators;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Dtos.Responses;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class UserService : BaseBusinessService<User>, IUserService
    {
        private readonly IPasswordService passwordService;
        private readonly IJwtSecurityTokenService jwtSecurityTokenService;
        private readonly IUserValidationService userValidationService;

        private bool AnyUserExists
        {
            get { return Context.Users.Any(); }
        }

        public UserService(IBaseUtilitiesProvider baseUtilitiesProvider,
            IPasswordService passwordService,
            IJwtSecurityTokenService jwtSecurityTokenService,
            IUserValidationService userValidationService) : base(baseUtilitiesProvider)
        {
            this.passwordService = passwordService;
            this.jwtSecurityTokenService = jwtSecurityTokenService;
            this.userValidationService = userValidationService;
        }

        public async Task DeleteUserAsync(int id)
        {
            this.userValidationService.ValidateDeleteUser();

            await DeleteAsync(id);
        }

        public IEnumerable<UserWithRoleDto> GetUsers()
        {
            this.userValidationService.ValidateGetUsers();

            var users = GetAll(true)
                .Include(x => x.Role)
                .Select(x => Mapper.Map<User, UserWithRoleDto>(x));

            return users;
        }

        public UserDto GetUser()
        {
            return Mapper.Map<User, UserDto>(CurrentUser);
        }

        public async Task<UserDto> GetUserAsync(int id)
        {
            var user = await GetByIdAsync(id);
            return Mapper.Map<User, UserDto>(user);
        }

        public async Task<User> GetUserAsync(string username)
        {
            return await this.Context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await this.Context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserWithRoleDto> LockUserAccountAsync(int id)
        {
            return await ChangeUserAccountStateAsync(id, false);
        }

        public async Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest)
        {
            var user = await this.GetUserAsync(loginUserRequest.Username);

            this.userValidationService.ValidateLoginUser(user);

            this.passwordService.CheckPassword(loginUserRequest.Password, user.HashedPassword);

            user.LastLoginDate = DateTime.UtcNow;

            await this.Context.SaveChangesAsync();

            var accessTokenGenerationData = new AccessTokenGenerationData
            {
                UserId = user.Id,
                RefreshToken = Encoding.Default.GetString(user.RefreshToken),
                Email = user.Email,
                AuthorizationRole = user.AuthorizationRole
            };

            var loginUserResponse = new LoginUserResponse
            {
                AccessToken = this.jwtSecurityTokenService.GenerateToken(accessTokenGenerationData),
                User = Mapper.Map<User, UserDto>(user)
            };

            return loginUserResponse;
        }

        public async Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest)
        {
            var user = Mapper.Map<RegisterUserRequest, User>(registerUserRequest);

            this.userValidationService.ValidateRegisterUser(user);

            user.HashedPassword = this.passwordService.HashPassword(registerUserRequest.Password);

            var refreshToken = this.jwtSecurityTokenService.GenerateRefreshToken();
            user.RefreshToken = Encoding.Default.GetBytes(refreshToken);

            user.RoleId = AnyUserExists ? (int)AuthorizationRole.User : (int)AuthorizationRole.Administrator;

            await Context.Users.AddAsync(user);

            await Context.SaveChangesAsync();

            var accessTokenGenerationData = new AccessTokenGenerationData
            {
                UserId = user.Id,
                RefreshToken = refreshToken,
                Email = user.Email,
                AuthorizationRole = user.AuthorizationRole
            };

            var registerUserResponse = new RegisterUserResponse
            {
                AccessToken = this.jwtSecurityTokenService.GenerateToken(accessTokenGenerationData),
                User = Mapper.Map<User, UserDto>(user)
            };

            return registerUserResponse;
        }

        public async Task<LoginUserResponse> SilentLoginAsync()
        {
            var user = this.CurrentUser;

            this.userValidationService.ValidateLoginUser(user);

            user.LastLoginDate = DateTime.UtcNow;

            await this.Context.SaveChangesAsync();

            var accessTokenGenerationData = new AccessTokenGenerationData
            {
                UserId = user.Id,
                RefreshToken = Encoding.Default.GetString(user.RefreshToken),
                Email = user.Email,
                AuthorizationRole = user.AuthorizationRole
            };

            var loginUserResponse = new LoginUserResponse
            {
                AccessToken = this.jwtSecurityTokenService.GenerateToken(accessTokenGenerationData),
                User = Mapper.Map<User, UserDto>(user)
            };

            return loginUserResponse;
        }

        public async Task<UserWithRoleDto> UnlockUserAccountAsync(int id)
        {
            return await ChangeUserAccountStateAsync(id, true);
        }

        public async Task<UserWithRoleDto> UpdateUserRoleAsync(UpdateUserRoleRequest request)
        {
            this.userValidationService.ValidateUpdateUserRole();

            var role = await Context.Roles.FirstAsync(x => x.Id == request.RoleId);
            var user = await GetByIdAsync(request.UserId);

            user.Role = role;
            user.RoleId = role.Id;

            await SaveChanges();

            return Mapper.Map<User, UserWithRoleDto>(user);
        }

        private async Task<UserWithRoleDto> ChangeUserAccountStateAsync(int id, bool isActive)
        {
            var user = await GetByIdAsync(id);

            this.userValidationService.ValidateUnlockUserAccount(user);

            user.IsActive = isActive;

            await SaveChanges();

            return Mapper.Map<User, UserWithRoleDto>(user);
        }
    }
}
