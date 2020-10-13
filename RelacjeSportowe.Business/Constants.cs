namespace RelacjeSportowe.Services
{
    public class Constants
    {
        public class Configuration
        {
            public const string AllowedOrigins = "AllowedOrigins";
            public const string DefaultConnection = "DefaultConnection";
        }

        public class CorsPolicies
        {
            public const string BasicPolicy = "BasicPolicy";
        }

        public class JwtToken      
        {
            public class Claims
            {
                public const string IdentityProvider = "identity_provider";
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
