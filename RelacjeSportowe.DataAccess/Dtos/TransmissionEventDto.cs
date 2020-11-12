namespace RelacjeSportowe.DataAccess.Dtos
{
    public class TransmissionEventDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string TimeInfo { get; set; }

        public string TransmissionEventType { get; set; }

        public int TransmissionEventTypeId { get; set; }
    }
}
