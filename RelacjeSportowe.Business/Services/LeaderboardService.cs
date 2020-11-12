using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace RelacjeSportowe.Business.Services
{
    public class LeaderboardService : BaseService, ILeaderboardService
    {
        public LeaderboardService(IBaseUtilitiesProvider baseUtilitiesProvider)
            : base(baseUtilitiesProvider)
        {
        }

        public IEnumerable<LeaderboardPositionDto> GetStandings()
        {
            var usersWithTransmissions = Context.Users
                .Include(x => x.Transmissions)
                .Where(x => x.IsActive)
                .Select(x => new
                {
                    x.Id,
                    x.Username,
                    x.RatingPoints,
                    Transmissions = x.Transmissions.Select(y => new { y.EndDate })
                })
                .OrderByDescending(x => x.RatingPoints)
                .AsEnumerable();

            var result = usersWithTransmissions
                .GroupBy(x => x.RatingPoints)
                .Select((group, index) => new LeaderboardPositionDto
                {
                    Position = index + 1,
                    RatingPoints = group.Key,
                    LeaderboardUserEntries = group.Select(x => new LeaderboardUserEntryDto
                    {
                        UserId = x.Id,
                        Username = x.Username,
                        IsTransmitting = x.Transmissions.Any(x => x.EndDate == null)
                    })
                });

            return result;
        }

        public IEnumerable<LeaderboardPositionDto> GetTopStandings()
        {
            var usersWithTransmissions = Context.Users
                .Include(x => x.Transmissions)
                .Where(x => x.IsActive)
                .Select(x => new
                {
                    x.Id,
                    x.Username,
                    x.RatingPoints,
                    Transmissions = x.Transmissions.Select(y => new { y.EndDate })
                })
                .OrderByDescending(x => x.RatingPoints)
                .Take(10)
                .AsEnumerable();

            var result = usersWithTransmissions
                .GroupBy(x => x.RatingPoints)
                .Select((group, index) => new LeaderboardPositionDto
                {
                    Position = index + 1,
                    RatingPoints = group.Key,
                    LeaderboardUserEntries = group.Select(x => new LeaderboardUserEntryDto
                    {
                        UserId = x.Id,
                        Username = x.Username,
                        IsTransmitting = x.Transmissions.Any(x => x.EndDate == null)
                    })
                });

            return result;
        }
    }
}
