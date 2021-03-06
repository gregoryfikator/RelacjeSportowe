﻿using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Dtos.Responses;
using RelacjeSportowe.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IUserService
    {
        Task DeleteUserAsync(int id);

        IEnumerable<UserWithRoleDto> GetUsers();

        UserDto GetUser();

        Task<UserDto> GetUserAsync(int id);

        Task<User> GetUserAsync(string username);

        Task<User> GetUserByEmailAsync(string email);

        Task<UserWithRoleDto> LockUserAccountAsync(int id);

        Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest);

        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest);

        Task<LoginUserResponse> SilentLoginAsync();

        Task<UserWithRoleDto> UnlockUserAccountAsync(int id);

        Task<UserWithRoleDto> UpdateUserRoleAsync(UpdateUserRoleRequest request);
    }
}
