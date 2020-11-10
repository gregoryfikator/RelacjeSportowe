using RelacjeSportowe.DataAccess.Interfaces;
using System;
using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Models
{
    public class Transmission : IEntity
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public virtual User User { get; set; }

        public int UserId { get; set; }

        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public DateTime EventDate { get; set; }

        public virtual IEnumerable<TransmissionEvent> TransmissionEvents { get; set; }
    }
}
