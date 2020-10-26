import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { LoginUserRequest } from 'src/app/models/dtos/requests/login-user-request';
import { RegisterUserRequest } from 'src/app/models/dtos/requests/register-user-request';
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

  public silentLogin(): Observable<any> {
    return this.httpClient.get(Constants.Endpoints.User.SilentLogin)
      .pipe(
        take(1),
        tap((response) => {
          this.jwtAccessTokenService.setToken(response.accessToken);
          this.authorizationService.setCurrentUser(new User(response.user));
        })
      );
  }

  public login(loginUserRequest: LoginUserRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Login, loginUserRequest)
      .pipe(
        take(1),
        tap((response) => {
          this.jwtAccessTokenService.setToken(response.accessToken);
          this.authorizationService.setCurrentUser(new User(response.user));
        })
      );
  }

  public register(registerUserRequest: RegisterUserRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Register, registerUserRequest)
      .pipe(
        take(1),
        tap((response) => {
          this.jwtAccessTokenService.setToken(response.accessToken);
          this.authorizationService.setCurrentUser(new User(response.user));
        })
      );
  }

  public getUserById(id: number) {
    var params = new HttpParams();
    params = params.append("id", id.toString());
    return this.httpClient.get('User/GetById', { params: params });
  }
}
