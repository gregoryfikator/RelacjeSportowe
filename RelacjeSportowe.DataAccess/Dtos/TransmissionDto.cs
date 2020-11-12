using System;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class TransmissionDto
    {
        public int Id { get; set; }

        public DateTime EventDate { get; set; }

        public DateTime StartDate { get; set; }

        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public string Username { get; set; }

        public int ViewersCount { get; set; }
    }
}
