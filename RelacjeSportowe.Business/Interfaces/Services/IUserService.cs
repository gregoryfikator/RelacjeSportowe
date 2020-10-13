using RelacjeSportowe.Business.Dtos;
using RelacjeSportowe.Business.Dtos.Requests;
using RelacjeSportowe.Business.Dtos.Responses;
using RelacjeSportowe.DataAccess.Models;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IUserService
    {
        UserDto GetUser();

        UserDto GetUser(int id);

        Task<User> GetUserAsync(string username);

        UserDto GetUserByEmail(string email);

        Task<LoginUserResponse> LoginUserAsync(LoginUserRequest loginUserRequest);

        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserRequest registerUserRequest);
    }
}
