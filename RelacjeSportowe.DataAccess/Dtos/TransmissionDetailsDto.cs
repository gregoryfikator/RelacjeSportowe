using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class TransmissionDetailsDto : TransmissionDto
    {
        public int RatingPoints { get; set; }

        public bool IsTransmitting { get; set; }

        public IEnumerable<TransmissionEventDto> TransmissionEvents { get; set; }
    }
}
