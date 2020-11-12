using Microsoft.AspNetCore.Mvc;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Dtos;
using System.Collections.Generic;

namespace RelacjeSportowe.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private readonly ILeaderboardService leaderboardService;

        public LeaderboardController(ILeaderboardService leaderboardService)
        {
            this.leaderboardService = leaderboardService;
        }

        [HttpGet("[action]")]
        public IEnumerable<LeaderboardPositionDto> GetStandings()
        {
            return this.leaderboardService.GetStandings();
        }

        [HttpGet("[action]")]
        public IEnumerable<LeaderboardPositionDto> GetTopStandings()
        {
            return this.leaderboardService.GetTopStandings();
        }
    }
}
