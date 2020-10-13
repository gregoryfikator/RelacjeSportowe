import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { User } from 'src/app/models/user';
import { JwtAccessTokenService } from './jwt-access-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
    private jwtAccessTokenService: JwtAccessTokenService) {
  }

  public getCurrentUser(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }

  public setCurrentUser(currentUser: User): void {
    this.currentUserSubject.next(currentUser);
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
        })
      );
  }
}
