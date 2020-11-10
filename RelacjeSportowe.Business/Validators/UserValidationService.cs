using RelacjeSportowe.Business.Exceptions;
using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Validators;
using RelacjeSportowe.DataAccess.Models;
using RelacjeSportowe.Services;
using System.Linq;

namespace RelacjeSportowe.Business.Validators
{
    public class UserValidationService : BaseValidationService, IUserValidationService
    {
        public UserValidationService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {
        }

        public void ValidateDeleteUser()
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.InsufficientPermissions)
                .If(!IsAdministrator());
        }

        public void ValidateGetUsers()
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.InsufficientPermissions)
                .If(!IsAdministrator());
        }

        public void ValidateLockUserAccount(User user)
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.InsufficientPermissions)
                .If(!IsModerator());
        }

        public void ValidateLoginUser(User user)
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.UserNotFound)
                .If(user == null);

            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.UserAccountLocked)
                .If(user.IsActive == false);
        }

        public void ValidateRegisterUser(User user)
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.EmailAlreadyExists)
                .If(Context.Users.Any(x => x.Email == user.Email));

            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.UsernameAlreadyExists)
                .If(Context.Users.Any(x => x.Username == user.Username));
        }

        public void ValidateUnlockUserAccount(User user)
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.InsufficientPermissions)
                .If(!IsModerator());
        }

        public void ValidateUpdateUserRole()
        {
            Throw.Exception<BusinessLogicException>(Constants.ErrorCodes.InsufficientPermissions)
                .If(!IsAdministrator());
        }
    }
}
