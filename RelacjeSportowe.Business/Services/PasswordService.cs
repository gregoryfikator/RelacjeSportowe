using RelacjeSportowe.Business.Interfaces.Services;
using System;
using System.Text;

namespace RelacjeSportowe.Business.Services
{
    public class PasswordService : IPasswordService
    {
        public void CheckPassword(string passwordToCheck, byte[] hashedPassword)
        {
            var hashedPasswordAsString = Encoding.ASCII.GetString(hashedPassword);

            if (BCrypt.Net.BCrypt.Verify(passwordToCheck, hashedPasswordAsString) == false)
            {
                throw new Exception("Incorrect passowrd");
            }
        }

        public byte[] HashPassword(string password)
        {
            var hashedPasswordAsString = BCrypt.Net.BCrypt.HashPassword(password);

            return Encoding.ASCII.GetBytes(hashedPasswordAsString);
        }
    }
}
