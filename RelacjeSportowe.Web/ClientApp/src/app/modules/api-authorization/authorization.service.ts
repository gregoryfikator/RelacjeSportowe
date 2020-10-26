import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AuthorizationRole } from 'src/app/models/enums/authorization-role.enum';
import { User } from 'src/app/models/user';
import { JwtAccessTokenService } from './jwt-access-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private currentUserRole: BehaviorSubject<AuthorizationRole> = new BehaviorSubject<AuthorizationRole>(null);

  constructor(private httpClient: HttpClient,
    private jwtAccessTokenService: JwtAccessTokenService) {
  }

  public getCurrentUser(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }

  public setCurrentUser(currentUser: User): void {
    this.currentUserSubject.next(currentUser);
  }

  public getUserRole(): BehaviorSubject<AuthorizationRole> {
    return this.currentUserRole;
  }

  public setUserRole(role: AuthorizationRole): void {
    this.currentUserRole.next(role);
  }

  public aquireUser(response: any): void {
    this.jwtAccessTokenService.setToken(response.accessToken);
    this.setCurrentUser(new User(response.user));
    this.setUserRole(this.jwtAccessTokenService.getUserRole());
  }

  public logoutUser(): void {
    this.setCurrentUser(null);
    this.setUserRole(null);
    this.jwtAccessTokenService.removeToken();
  }

  public isLogged(): boolean {
    return this.currentUserSubject.value != null && this.currentUserRole.value != null;
  }

  public isAdministrator(): Observable<boolean> {
    return new Observable((subscriber) => {
      if (this.jwtAccessTokenService.hasToken() === true) {
        if (this.currentUserSubject.value == null) {
          this.refreshCurrentUser()
            .toPromise()
            .then((user: User) => {
              subscriber.next(this.currentUserRole.value === AuthorizationRole.Administrator ? true : false);
            })
            .catch((error: any) => {
              console.error(error);
              subscriber.next(false);
            });
        } else {
          subscriber.next(this.currentUserRole.value === AuthorizationRole.Administrator ? true : false);
        }
      } else {
        subscriber.next(false);
      }
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return new Observable((subscriber) => {
      if (this.jwtAccessTokenService.hasToken() === true) {
        if (this.currentUserSubject.value == null) {
          this.refreshCurrentUser()
            .toPromise()
            .then((user: User) => {
              subscriber.next(user ? true : false);
            })
            .catch((error: any) => {
              console.error(error);
              subscriber.next(false);
            });
        } else {
          subscriber.next(true);
        }
      } else {
        subscriber.next(false);
      }
    });
  }

  private refreshCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(Constants.Endpoints.User.Get)
      .pipe(
        tap((user: User) => {
          this.currentUserSubject.next(user);
          if (user != null) {
            var role = this.jwtAccessTokenService.getUserRole();

            if (role != null) {
              this.currentUserRole.next(role);
            }
          }
        })
      );
  }
}
