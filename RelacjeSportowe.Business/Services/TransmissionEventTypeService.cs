using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class TransmissionEventTypeService : BaseBusinessService<TransmissionEventType>, ITransmissionEventTypeService
    {
        public TransmissionEventTypeService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {
        }

        public async Task<TransmissionEventType> AddTransmissionEventTypeAsync(AddTransmissionEventTypeRequest request)
        {
            var transmissionEventType = Mapper.Map<AddTransmissionEventTypeRequest, TransmissionEventType>(request);
            return await base.AddAsync(transmissionEventType);
        }

        public async Task<TransmissionEventType> UpdateTransmissionEventTypeAsync(UpdateTransmissionEventTypeRequest request)
        {
            var transmissionEventType = Mapper.Map<UpdateTransmissionEventTypeRequest, TransmissionEventType>(request);
            return await base.UpdateAsync(transmissionEventType);
        }

        public IEnumerable<TransmissionEventType> GetTransmissionEventTypes()
        {
            var transmissionEventTypes = base.GetAll(true);

            return transmissionEventTypes;
        }
    }
}
