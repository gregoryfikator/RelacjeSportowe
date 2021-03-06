﻿using RelacjeSportowe.DataAccess.Dtos;
using System.Collections.Generic;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface ILeaderboardService
    {
        IEnumerable<LeaderboardPositionDto> GetStandings();

        IEnumerable<LeaderboardPositionDto> GetTopStandings();
    }
}
