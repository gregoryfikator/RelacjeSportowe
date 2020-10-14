using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Dtos.Responses;
using RelacjeSportowe.DataAccess.Models;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserDto> ActivateUser();

        Task<UserDto> ActivateUser(int id);

        Task DeleteUser(int id);

        UserDto GetUser();

        Task<UserDto> GetUser(int id);

        Task<User> GetUserAsync(string username);

        Task<User> GetUserByEmail(string email);

        Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest);

        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest);
    }
}
