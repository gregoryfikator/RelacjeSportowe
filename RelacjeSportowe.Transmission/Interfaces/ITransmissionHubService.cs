using System.Collections.Generic;

namespace RelacjeSportowe.Transmission.Interfaces
{
    public interface ITransmissionHubService
    {
        void AddViewer(string groupName);

        int GetViewersCount(string groupName);

        IEnumerable<int> GetViewersCounts(IEnumerable<string> groupNames);

        void RemoveViewer(string groupName);
    }
}
