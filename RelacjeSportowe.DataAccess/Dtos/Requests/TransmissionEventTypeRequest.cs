namespace RelacjeSportowe.DataAccess.Dtos.Requests
{
    public abstract class TransmissionEventTypeRequest
    {
        public string Value { get; set; }
    }

    public class AddTransmissionEventTypeRequest : TransmissionEventTypeRequest
    {
    }

    public class EditTransmissionEventTypeRequest : TransmissionEventTypeRequest
    {
        public int Id { get; set; }
    }
}
