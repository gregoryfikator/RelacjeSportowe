namespace RelacjeSportowe.DataAccess.Dtos.Responses
{
    public class RegisterUserResponse
    {
        public UserDto User { get; set; }

        public string AccessToken { get; set; }
    }
}
