using Microsoft.AspNetCore.SignalR;
using RelacjeSportowe.Transmission.Interfaces;
using RelacjeSportowe.Transmission.Models;
using System.Threading.Tasks;

namespace RelacjeSportowe.Transmission.Hubs
{
    public class TransmissionHub : Hub
    {
        private readonly ITransmissionHubService transmissionHubService;

        public TransmissionHub(ITransmissionHubService transmissionHubService)
        {
            this.transmissionHubService = transmissionHubService;
        }

        public async Task AddToGroup(string groupName)
        { 
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            this.transmissionHubService.AddViewer(groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            this.transmissionHubService.RemoveViewer(groupName);
        }

        public async Task BroadcastTestModel(TestModel testModel)
        {
            await Clients.All.SendAsync("TestModelReceived", testModel);
        }

        public async Task BroadcastTransmissionEvent(string groupName)
        {
            // dodać event do bazy dla ziomków którzy nie śledzą od początku

            await Clients.Group(groupName).SendAsync("TransmissionEventReceived", "TRANSMISSION EVENT");
        }
    }
}
