using RelacjeSportowe.DataAccess.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace RelacjeSportowe.DataAccess.Models
{
    public class User : IEntity
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int RatingPoints { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public DateTime RegistrationDate { get; set; }

        public byte[] RefreshToken { get; set; }

        public byte[] HashedPassword { get; set; }
    }
}
