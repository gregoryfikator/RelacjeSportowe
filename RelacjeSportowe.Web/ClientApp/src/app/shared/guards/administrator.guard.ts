import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authorizationService: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleAuthorization();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleAuthorization();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleAuthorization();
  }

  private handleAuthorization(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorizationService.isAdministrator()
      .pipe(
        take(1),
        tap((isAdministrator: boolean) => {
          if (isAdministrator === false) {
            // show info insufficient permissions
          }

          return isAdministrator;
        })
      );
  }
}
