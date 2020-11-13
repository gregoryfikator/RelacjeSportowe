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

    public class DeleteTransmissionRequest
    {
        public int Id { get; set; }
    }

    public class EndTransmissionRequest
    {
        public int Id { get; set; }
    }

    public class UpdateTransmissionRequest : TransmissionRequest
    {
        public int Id { get; set; }
    }

    public class VoteTransmissionRequest
    {
        public int Id { get; set; }

        public int Rating { get; set; }
    }
}
