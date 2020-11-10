import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { LoginUserRequest } from 'src/app/models/dtos/requests/login-user-request';
import { RegisterUserRequest } from 'src/app/models/dtos/requests/register-user-request';
import { UpdateUserRoleRequest } from 'src/app/models/dtos/requests/update-user-role-request';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: Subject<User> = new Subject<User>();

  constructor(private httpClient: HttpClient,
    private authorizationService: AuthorizationService
  ) {
    this.authorizationService.getCurrentUser()
      .subscribe((user: User) => {
        this.currentUser.next(user);
      });
  }

  public deleteUser(userId: number): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Delete, userId)
      .pipe(
        take(1)
      );
  }

  public getCurrentUser$(): Subject<User> {
    return this.currentUser;
  }

  public getUserById(id: number): Observable<any> {
    var params = new HttpParams();
    params = params.append("id", id.toString());
    return this.httpClient.get('User/GetById', { params: params });
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(Constants.Endpoints.User.GetUsers);
  }

  public lockUserAccount(userId: number): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.LockUserAccount, userId)
      .pipe(
        take(1)
      );
  }

  public login(loginUserRequest: LoginUserRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Login, loginUserRequest)
      .pipe(
        take(1),
        tap((response) => {
          this.authorizationService.acquireUser(response);
        })
      );
  }

  public silentLogin(): Observable<any> {
    return this.httpClient.get(Constants.Endpoints.User.SilentLogin)
      .pipe(
        take(1),
        tap((response) => {
          this.authorizationService.acquireUser(response);
        })
      );
  }

  public register(registerUserRequest: RegisterUserRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.Register, registerUserRequest)
      .pipe(
        take(1),
        tap((response) => {
          this.authorizationService.acquireUser(response);
        })
      );
  }

  public unlockUserAccount(userId: number): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.UnlockUserAccount, userId)
      .pipe(
        take(1)
      );
  }

  public updateUserRole(request: UpdateUserRoleRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.User.UpdateUserRole, request)
      .pipe(
        take(1)
      );
  }
}
