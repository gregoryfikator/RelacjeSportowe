import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Transmission } from 'src/app/models/transmission';
import { UserStanding } from 'src/app/models/user-standing';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';
import { LeaderboardService } from 'src/app/shared/services/leaderboard.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  public standings$: Observable<UserStanding[]> = new Observable<UserStanding[]>();
  public newestTransmissions$: Observable<Transmission[]> = new Observable<Transmission[]>();
  public topTransmissions$: Observable<Transmission[]> = new Observable<Transmission[]>();

  constructor(private authorizationService: AuthorizationService,
    private leaderboardService: LeaderboardService,
    private transmissionService: TransmissionService,
    private router: Router) {

    this.standings$ = timer(0, 30000)
      .pipe(
        switchMap(() => {
          return this.leaderboardService.getTopStandings()
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
            );
        })
      );

    this.newestTransmissions$ = timer(0, 30000)
      .pipe(
        switchMap(() => {
          return this.transmissionService.getNewestTransmissions();
        })
      );

    this.topTransmissions$ = timer(0, 30000)
      .pipe(
        switchMap(() => {
          return this.transmissionService.getTopTransmissions();
        })
      );
  }

  ngOnInit() {
  }

  public get isUserLogged() {
    return this.authorizationService.getCurrentUser().value != null;
  }

  public navigateAllTransmissions() {
    this.navigate(`${Constants.Routing.BasicPaths.Transmission}/${Constants.Routing.TransmissionPaths.AllTransmissions}`);
  }

  public navigateAddTransmission() {
    this.navigate(`${Constants.Routing.BasicPaths.Transmission}/${Constants.Routing.TransmissionPaths.AddTransmission}`);
  }

  public navigateMyTransmissions() {
    this.navigate(`${Constants.Routing.BasicPaths.Transmission}/${Constants.Routing.TransmissionPaths.MyTransmissions}`);
  }

  private navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
