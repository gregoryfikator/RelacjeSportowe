using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Interfaces.Validators
{
    public interface IUserValidationService
    {
        void ValidateLoginUser(User user);

        void ValidateRegisterUser(User user);
    }
}
