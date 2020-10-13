import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';
import { JwtAccessTokenService } from 'src/app/modules/api-authorization/jwt-access-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: Subject<User> = new Subject<User>();

  constructor(private httpClient: HttpClient,
    private authorizationService: AuthorizationService,
    private jwtAccessTokenService: JwtAccessTokenService
  ) {
    this.authorizationService.getCurrentUser()
      .subscribe((user: User) => {
        this.currentUser.next(user);
      });
  }

  public getCurrentUser$(): Subject<User> {
    return this.currentUser;
  }

  public login(data): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Login, data)
      .pipe(
        take(1),
        tap((response) => {
          this.jwtAccessTokenService.setToken(response.accessToken);
          this.authorizationService.setCurrentUser(new User(response.user));
        })
      );
  }

  public register(): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Register, {
      email: "patrgre967@student.polsl.pl",
      identityProvider: 0,
      password: "123Qwe!@",
      username: "Gregor"
    })
      .pipe(
        take(1),
        tap((response) => {
          this.jwtAccessTokenService.setToken(response.accessToken);
          this.authorizationService.setCurrentUser(new User(response.user));
        })
      );
  }
}
