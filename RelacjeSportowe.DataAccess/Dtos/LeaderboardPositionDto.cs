using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class LeaderboardPositionDto
    {
        public int Position { get; set; }

        public int RatingPoints { get; set; }

        public IEnumerable<LeaderboardUserEntryDto> LeaderboardUserEntries { get; set; }
    }
}
