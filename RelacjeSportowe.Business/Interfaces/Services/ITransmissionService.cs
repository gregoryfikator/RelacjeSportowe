using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface ITransmissionService
    {
        Task<TransmissionDto> AddTransmissionAsync(AddTransmissionRequest request);

        Task<TransmissionEventDto> AddTransmissionEventAsync(AddTransmissionEventRequest request);

        IEnumerable<TransmissionDto> GetAllTransmissions();

        IEnumerable<TransmissionDto> GetAllLiveTransmissions();

        IEnumerable<TransmissionDto> GetMyTransmissions();

        IEnumerable<TransmissionDto> GetNewestTransmissions();

        IEnumerable<TransmissionDto> GetTopTransmissions();

        Task<TransmissionDetailsDto> GetTransmissionAsync(int id);

        Task<TransmissionEventDto> UpdateTransmissionEventAsync(UpdateTransmissionEventRequest request);
    }
}
