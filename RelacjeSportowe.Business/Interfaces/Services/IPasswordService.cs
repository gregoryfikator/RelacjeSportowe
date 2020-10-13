namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IPasswordService
    {
        void CheckPassword(string passwordToCheck, byte[] hashedPassword);

        byte[] HashPassword(string password);
    }
}
