using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Validators;
using RelacjeSportowe.Business.Services;
using RelacjeSportowe.DataAccess.Enums;

namespace RelacjeSportowe.Business.Validators
{
    public abstract class BaseValidationService : BaseService, IBaseValidationService
    {
        public BaseValidationService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {
        }

        protected bool IsAdministrator()
        {
            return CurrentUser.AuthorizationRole == AuthorizationRole.Administrator;
        }

        protected bool IsAuthorizedUser()
        {
            return CurrentUser != null && CurrentUser.AuthorizationRole > 0;
        }

        protected bool IsModerator()
        {
            return IsAdministrator() || CurrentUser.AuthorizationRole == AuthorizationRole.Moderator; 
        }
    }
}
