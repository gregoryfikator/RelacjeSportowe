using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Dtos.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelacjeSportowe.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize(Policy = "Administrator")]
        [HttpPost("[action]")]
        public async Task<int> Delete([FromBody] int id)
        {
            await this.userService.DeleteUserAsync(id);
            return id;
        }

        [Authorize(Policy = "Administrator")]
        [HttpGet("[action]")]
        public IEnumerable<UserWithRoleDto> GetUsers()
        {
            return this.userService.GetUsers();
        }

        [Authorize(Policy = "User")]
        [HttpGet("[action]")]
        public UserDto Get()
        {
            return this.userService.GetUser();
        }

        [Authorize(Policy = "Administrator")]
        [HttpGet("[action]")]
        public async Task<UserDto> GetById([FromQuery]int id)
        {
            return await this.userService.GetUserAsync(id);
        }

        [Authorize(Policy = "Moderator")]
        [HttpPost("[action]")]
        public async Task<UserWithRoleDto> LockUserAccount([FromBody] int id)
        {
            return await this.userService.LockUserAccountAsync(id);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<LoginUserResponse> Login([FromBody]LoginUserRequest loginUserRequest)
        {
            return await this.userService.LoginUserAsync(loginUserRequest);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<RegisterUserResponse> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            return await this.userService.RegisterUserAsync(registerUserRequest);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<LoginUserResponse> SilentLogin()
        {
            return await this.userService.SilentLoginAsync();
        }

        [Authorize(Policy = "Moderator")]
        [HttpPost("[action]")]
        public async Task<UserWithRoleDto> UnlockUserAccount([FromBody] int id)
        {
            return await this.userService.UnlockUserAccountAsync(id);
        }

        [Authorize(Policy = "Administrator")]
        [HttpGet("[action]")]
        public async Task<UserWithRoleDto> UpdateUserRole([FromBody] UpdateUserRoleRequest updateUserRoleRequest)
        {
            return await this.userService.UpdateUserRoleAsync(updateUserRoleRequest);
        }
    }
}
