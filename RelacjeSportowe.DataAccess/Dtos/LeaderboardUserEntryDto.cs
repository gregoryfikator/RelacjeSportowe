namespace RelacjeSportowe.DataAccess.Dtos
{
    public class LeaderboardUserEntryDto
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public bool IsTransmitting { get; set; }
    }
}
