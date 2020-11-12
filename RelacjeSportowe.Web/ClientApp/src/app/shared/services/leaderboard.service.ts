import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private httpClient: HttpClient,) {
  }

  public getStandings(): Observable<any> {
    return this.httpClient.get(Constants.Endpoints.Leaderboard.GetStandings)
      .pipe(
        take(1)
      );
  }

  public getTopStandings(): Observable<any> {
    return this.httpClient.get(Constants.Endpoints.Leaderboard.GetTopStandings)
      .pipe(
        take(1)
      );
  }
}
