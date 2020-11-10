using System.Threading.Tasks;

namespace RelacjeSportowe.Transmission.Interfaces
{
    public interface ITransmissionHub
    {
        Task AddToGroup(string groupName);

        Task RemoveFromGroup(string groupName);

        Task Test(string message);

        Task TransmissionEvent(string groupName);
    }
}
