using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Validators;
using RelacjeSportowe.Business.Services;

namespace RelacjeSportowe.Business.Validators
{
    public abstract class BaseValidationService : BaseService, IBaseValidationService
    {
        public BaseValidationService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {
        }
    }
}
