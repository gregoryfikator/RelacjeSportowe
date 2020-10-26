using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Dtos.Responses;
using RelacjeSportowe.DataAccess.Models;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IUserService
    {
        Task DeleteUser(int id);

        UserDto GetUser();

        Task<UserDto> GetUserAsync(int id);

        Task<User> GetUserAsync(string username);

        Task<User> GetUserByEmailAsync(string email);

        Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest);

        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest);

        Task<LoginUserResponse> SilentLoginAsync();
    }
}
