﻿using Newtonsoft.Json;
using RelacjeSportowe.DataAccess.Enums;
using RelacjeSportowe.DataAccess.Interfaces;
using System;
using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Models
{
    public class User : IEntity
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public int RatingPoints { get; set; }

        public bool IsActive { get; set; }

        public DateTime LastLoginDate { get; set; }

        public DateTime RegistrationDate { get; set; }

        public byte[] RefreshToken { get; set; }

        public byte[] HashedPassword { get; set; }

        public Role Role { get; set; }

        public int RoleId { get; set; }

        [JsonIgnore]
        public AuthorizationRole AuthorizationRole
        {
            get { return (AuthorizationRole)RoleId; }
        }

        public virtual ICollection<Transmission> Transmissions { get; set; }
    }
}
