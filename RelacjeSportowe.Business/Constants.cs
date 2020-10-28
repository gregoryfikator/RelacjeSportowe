namespace RelacjeSportowe.Services
{
    public class Constants
    {
        public class StatusCodes
        {
            public const int BusinessLogicException = 470;
            public const int RedirectToLoginPage = 474;
            public const int NewAccessTokenCreated = 475;
        }

        public class ErrorCodes
        {
            public const int EmailAlreadyExists = 1001;
            public const int UsernameAlreadyExists = 1002;
            public const int UserNotFound = 1003;
        }

        public class Configuration
        {
            public const string AllowedOrigins = "AllowedOrigins";
            public const string DefaultConnection = "DefaultConnection";
            public const string JwtAuthConfiguration = "JwtAuthConfiguration";
        }

        public class CorsPolicies
        {
            public const string BasicPolicy = "BasicPolicy";
        }

        public class JwtToken      
        {
            public class Claims
            {
                public const string Email = "email";
                public const string FirstName = "first_name";
                public const string Role = "role";
                public const string LastName = "last_name";
                public const string RefreshToken = "refresh_token";
                public const string UserId = "user_id";
            }

            public class Settings
            {
                public const int RefreshTokenLengthInBytes = 16;
                public const int TokenProlongationTimeInMinutes = 30;
            }
        }
    }
}
