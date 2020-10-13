using RelacjeSportowe.Business.Enums;
using System.ComponentModel.DataAnnotations;

namespace RelacjeSportowe.Business.Dtos.Requests
{
    public class RegisterUserRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public IdentityProvider IdentityProvider { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

    }
}
