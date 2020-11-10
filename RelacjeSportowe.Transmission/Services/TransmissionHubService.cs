using RelacjeSportowe.Transmission.Interfaces;
using System.Collections.Generic;

namespace RelacjeSportowe.Transmission.Services
{
    public class TransmissionHubService : ITransmissionHubService
    {
        private readonly Dictionary<string, int> ConnectedUsersCount = new Dictionary<string, int>();

        public void AddViewer(string groupName)
        {
            if (!ConnectedUsersCount.ContainsKey(groupName))
            {
                ConnectedUsersCount.Add(groupName, 0);
            }

            ConnectedUsersCount[groupName] += 1;
        }

        public int GetViewersCount(string groupName)
        {
            return ConnectedUsersCount.TryGetValue(groupName, out int viewersCount) ? viewersCount : 0;
        }

        public IEnumerable<int> GetViewersCounts(IEnumerable<string> groupNames)
        {
            var viewersCounts = new List<int>();

            foreach (var groupName in groupNames)
            {
                var count = ConnectedUsersCount.TryGetValue(groupName, out int viewersCount) ? viewersCount : 0;
                viewersCounts.Add(count);
            }

            return viewersCounts;
        }

        public void RemoveViewer(string groupName)
        {
            ConnectedUsersCount[groupName] -= 1;

            if (ConnectedUsersCount[groupName] == 0)
            {
                ConnectedUsersCount.Remove(groupName);
            }
        }
    }
}
