using RelacjeSportowe.DataAccess.Enums;

namespace RelacjeSportowe.DataAccess.Dtos
{
    public class AccessTokenGenerationData
    {
        public int UserId { get; set; }

        public int RoleId { get; set; }

        public IdentityProvider IdentityProvider { get; set; }

        public string RefreshToken { get; set; }
    }
}
