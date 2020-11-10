import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/app/shared/services/leaderboard.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserStanding } from 'src/app/models/user-standing';

@Component({
  selector: 'app-leaderboard-dashboard',
  templateUrl: './leaderboard-dashboard.component.html',
  styleUrls: ['./leaderboard-dashboard.component.less']
})
export class LeaderboardDashboardComponent implements OnInit {
  public standings$: Observable<UserStanding[]> = new Observable<UserStanding[]>();

  constructor(private leaderboardService: LeaderboardService) {

    this.standings$ = this.leaderboardService.getStandings()
      .pipe(
        map((entries) => {
          let ratings: UserStanding[] = [];
          entries.forEach(entry => {
            const userEntries = entry.leaderboardUserEntries;

            userEntries.forEach((userEntry, index) => {
              const standing = new UserStanding({
                position: index === 0 ? entry.position : '-',
                ratingPoints: entry.ratingPoints,
                username: userEntry.username,
                userId: userEntry.userId,
                isTransmitting: userEntry.isTransmitting
              });

              ratings.push(standing);
            });
          });

          return ratings;
        })
      )
  }

  ngOnInit() {
  }
}
