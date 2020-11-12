using System;
using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class TransmissionDetailsDto : TransmissionDto
    {
        public DateTime? EndDate { get; set; }

        public int UserId { get; set; }

        public int RatingPoints { get; set; }

        public bool IsTransmitting { get; set; }

        public IEnumerable<TransmissionEventDto> TransmissionEvents { get; set; }
    }
}
