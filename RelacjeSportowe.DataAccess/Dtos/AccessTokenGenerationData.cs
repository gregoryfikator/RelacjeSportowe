using RelacjeSportowe.DataAccess.Enums;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class AccessTokenGenerationData
    {
        public int UserId { get; set; }

        public AuthorizationRole AuthorizationRole { get; set; }

        public string RefreshToken { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
