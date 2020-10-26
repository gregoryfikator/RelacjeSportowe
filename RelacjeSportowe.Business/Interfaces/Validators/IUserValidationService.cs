using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Interfaces.Validators
{
    public interface IUserValidationService
    {
        void ValidateRegisterUser(User user);
    }
}
