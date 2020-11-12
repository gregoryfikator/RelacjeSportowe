using System.Collections.Generic;

namespace RelacjeSportowe.Business.Interfaces.Hubs
{
    public interface ITransmissionHubService
    {
        void AddViewer(string connectionId, string groupName);

        int GetViewersCount(string groupName);

        IEnumerable<int> GetViewersCounts(IEnumerable<string> groupNames);

        void RemoveViewer(string connectionId, string groupName);
    }
}
