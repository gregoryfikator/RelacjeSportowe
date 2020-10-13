using RelacjeSportowe.Business.Extensions;
using RelacjeSportowe.Business.Interfaces.Services;
using System;
using System.Linq;
using System.Security.Cryptography;
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

            //var iteratorBytes = fullHash.SubArray(0, 2);
            //var saltBytes = fullHash.SubArray(2, 16);
            //var hashBytes = fullHash.SubArray(2 + 16, 48);

            //using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(passwordToCheck, saltBytes, BitConverter.ToUInt16(iteratorBytes)))
            //{
            //    var bytes = rfc2898DeriveBytes.GetBytes(48);

            //    return bytes.SequenceEqual(hashBytes);
            //}
        }

        public byte[] HashPassword(string password)
        {
            var hashedPasswordAsString = BCrypt.Net.BCrypt.HashPassword(password);

            return Encoding.ASCII.GetBytes(hashedPasswordAsString);

            //byte[] fullHashBytes = new byte[2 + 16 + 48];

            //byte[] hashBytes = new byte[48];
            //byte[] iteratorBytes = new byte[2];
            //byte[] saltBytes = new byte[16];

            //ushort iterations = 0;

            //var rngProvider = new RNGCryptoServiceProvider();

            //rngProvider.GetBytes(iteratorBytes);
            //rngProvider.GetBytes(saltBytes);

            //using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, this.GetNumberFromBytes(iteratorBytes, 20000, 65000)))
            //{
            //    hashBytes = rfc2898DeriveBytes.GetBytes(48);
            //    iterations = (ushort)rfc2898DeriveBytes.IterationCount;
            //}

            //Buffer.BlockCopy(BitConverter.GetBytes(iterations), 0, fullHashBytes, 0, 2);
            //Buffer.BlockCopy(saltBytes, 0, fullHashBytes, 2, 16);
            //Buffer.BlockCopy(hashBytes, 0, fullHashBytes, 2 + 16, 48);

            //return fullHashBytes;
        }

        //private int GetNumberFromBytes(byte[] bytes, int min, int max)
        //{
        //    var number = BitConverter.ToUInt16(bytes);
        //    return (number % (max - min)) + min;
        //}
    }
}
