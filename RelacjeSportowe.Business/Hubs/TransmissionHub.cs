using Microsoft.AspNetCore.SignalR;
using RelacjeSportowe.Business.Interfaces.Hubs;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos.Requests;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Hubs
{
    public class TransmissionHub : Hub
    {
        private readonly ITransmissionHubService transmissionHubService;
        private readonly ITransmissionService transmissionService;

        public TransmissionHub(ITransmissionHubService transmissionHubService,
            ITransmissionService transmissionService)
        {
            this.transmissionHubService = transmissionHubService;
            this.transmissionService = transmissionService;
        }

        public async Task BroadcastTransmissionEvent(AddTransmissionEventRequest request)
        {
            var transmissionEvent = await this.transmissionService.AddTransmissionEventAsync(request);

            var groupName = $"tid-{request.TransmissionId}";

            await Clients.Group(groupName).SendAsync("TransmissionEventReceived", transmissionEvent);
        }

        public async Task BroadcastTransmissionEventUpdate(UpdateTransmissionEventRequest request)
        {
            var transmissionEvent = await this.transmissionService.UpdateTransmissionEventAsync(request);

            var groupName = $"tid-{request.TransmissionId}";

            await Clients.Group(groupName).SendAsync("TransmissionEventUpdateReceived", transmissionEvent);
        }

        public async Task SubscribeTransmission(int id)
        {
            var groupName = $"tid-{id}";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            this.transmissionHubService.AddViewer(Context.ConnectionId, groupName);
        }

        public async Task UnsubscribeTransmission(int id)
        {
            var groupName = $"tid-{id}";

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            this.transmissionHubService.RemoveViewer(Context.ConnectionId, groupName);
        }
    }
}
