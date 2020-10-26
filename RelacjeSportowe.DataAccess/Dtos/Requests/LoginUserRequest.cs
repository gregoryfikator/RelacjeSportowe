using System.ComponentModel.DataAnnotations;

namespace RelacjeSportowe.DataAccess.Dtos.Requests
{
    public class LoginUserRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
