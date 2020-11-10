using RelacjeSportowe.DataAccess.Models;

namespace RelacjeSportowe.Business.Interfaces.Validators
{
    public interface IUserValidationService
    {
        void ValidateDeleteUser();

        void ValidateGetUsers();

        void ValidateLockUserAccount(User user);

        void ValidateLoginUser(User user);

        void ValidateRegisterUser(User user);

        void ValidateUnlockUserAccount(User user);

        void ValidateUpdateUserRole();
    }
}
