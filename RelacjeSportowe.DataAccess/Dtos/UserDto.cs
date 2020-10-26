namespace RelacjeSportowe.DataAccess.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public int RatingPoints { get; set; }

        public bool IsActive { get; set; }
    }
}
