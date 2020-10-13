using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Dtos.Requests;
using RelacjeSportowe.Business.Dtos.Responses;
using RelacjeSportowe.Business.Interfaces.Services;
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

        [AllowAnonymous]
        [HttpGet("[action]")]
        public UserDto Get()
        {
            return this.userService.GetUser();
        }

        [AllowAnonymous]
        [HttpGet("[action]/{id}")]
        public UserDto Get(int id)
        {
            return this.userService.GetUser();
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
    }
}
