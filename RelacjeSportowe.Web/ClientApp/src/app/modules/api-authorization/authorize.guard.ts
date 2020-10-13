import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
    private authorizationService: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleAuthorization(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleAuthorization(route.path);
  }

  private handleAuthorization(redirectUrl: string): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorizationService.isAuthenticated()
      .pipe(
        tap((isAuthenticated: boolean) => {
          if (isAuthenticated === false) {
            this.router.navigate([Constants.Routing.BasicPaths.Login], {
              queryParams: {
                ['redirectUrl']: redirectUrl
              }
            });
          }
        })
      );
  }
}
