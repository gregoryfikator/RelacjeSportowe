namespace RelacjeSportowe.Business.Dtos.Responses
{
    public class LoginUserResponse
    {
        public UserDto User { get; set; }

        public string AccessToken { get; set; }
    }
}
