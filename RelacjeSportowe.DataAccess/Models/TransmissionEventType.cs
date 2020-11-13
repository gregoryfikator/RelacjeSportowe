using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Models
{
    public class TransmissionEventType : DictionaryEntity
    {
        public virtual IEnumerable<TransmissionEvent> TrasmissionEvents { get; set; }
    }
}
