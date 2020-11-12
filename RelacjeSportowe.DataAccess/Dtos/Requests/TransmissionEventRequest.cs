namespace RelacjeSportowe.DataAccess.Dtos.Requests
{
    public abstract class TransmissionEventRequest
    {
        public int TransmissionId { get; set; }

        public int TransmissionEventTypeId { get; set; }

        public string Description { get; set; }

        public string TimeInfo { get; set; }
    }

    public class AddTransmissionEventRequest : TransmissionEventRequest
    {
    }

    public class UpdateTransmissionEventRequest : TransmissionEventRequest
    {
        public int Id { get; set; }
    }
}
