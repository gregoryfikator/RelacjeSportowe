using RelacjeSportowe.Business.Interfaces.Hubs;
using System.Collections.Generic;

namespace RelacjeSportowe.Business.Services
{
    public class TransmissionHubService : ITransmissionHubService
    {
        private Dictionary<string, int> ConnectedUsersCount = new Dictionary<string, int>();

        public void AddViewer(string connectionId, string groupName)
        {
            if (!ConnectedUsersCount.ContainsKey(groupName))
            {
                ConnectedUsersCount.Add(groupName, 0);
            }

            ConnectedUsersCount[groupName] += 1;
        }

        public int GetViewersCount(string groupName)
        { 
            var a = ConnectedUsersCount.TryGetValue(groupName, out int viewersCount);
            if (a)
                return viewersCount;
            else return 0;
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

        public void RemoveViewer(string connectionId, string groupName)
        {
            ConnectedUsersCount[groupName] -= 1;

            if (ConnectedUsersCount[groupName] == 0)
            {
                ConnectedUsersCount.Remove(groupName);
            }
        }
    }
}
