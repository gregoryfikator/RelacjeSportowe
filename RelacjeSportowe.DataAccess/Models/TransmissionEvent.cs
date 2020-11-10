using RelacjeSportowe.DataAccess.Interfaces;

namespace RelacjeSportowe.DataAccess.Models
{
    public class TransmissionEvent : IEntity
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string TimeInfo { get; set; }

        public TransmissionEventType TransmissionEventType { get; set; }

        public int TransmissionEventTypeId { get; set; }

        public virtual Transmission Transmission { get; set; }

        public int TransmissionId { get; set; }
    }
}
