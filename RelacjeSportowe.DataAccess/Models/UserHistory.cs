using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Interfaces;
using System;

namespace RelacjeSportowe.DataAccess.Models
{
    public class UserHistory : IEntity, IAuditable
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int RatingPoints { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }

        public bool IsActive { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime RegistrationDate { get; set; }

        public IdentityProvider IdentityProvider { get; set; }

        public byte[] RefreshToken { get; set; }

        public byte[] HashedPassword { get; set; }

        public int ModifiedById { get; set; }

        public User ModifiedBy { get; set; }

        public DateTime ModifiationDate { get; set; }
    }
}
