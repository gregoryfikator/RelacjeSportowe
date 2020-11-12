using System;

namespace RelacjeSportowe.DataAccess.Dtos.Requests
{
    public abstract class TransmissionRequest
    {
        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public DateTime EventDate { get; set; }
    }

    public class AddTransmissionRequest : TransmissionRequest
    {
    }

    public class UpdateTransmissionRequest : TransmissionRequest
    {
        public int Id { get; set; }
    }
}
