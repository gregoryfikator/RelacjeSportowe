using RelacjeSportowe.DataAccess.Dtos.Requests;
using RelacjeSportowe.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface ITransmissionEventTypeService
    {
        Task<TransmissionEventType> AddTransmissionEventTypeAsync(AddTransmissionEventTypeRequest request);

        Task<TransmissionEventType> UpdateTransmissionEventTypeAsync(UpdateTransmissionEventTypeRequest request);

        IEnumerable<TransmissionEventType> GetTransmissionEventTypes();
    }
}
