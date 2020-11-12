using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Hubs
{
    public interface ITransmissionHub
    {
        Task AddToGroup(string groupName);

        Task RemoveFromGroup(string groupName);

        Task Test(string message);

        Task TransmissionEvent(string groupName);
    }
}
