using RelacjeSportowe.Business.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RelacjeSportowe.Business.Dtos
{
    public class AccessTokenGenerationDto
    {
        public int UserId { get; set; }

        public IdentityProvider IdentityProvider { get; set; }

        public string RefreshToken { get; set; }
    }
}
