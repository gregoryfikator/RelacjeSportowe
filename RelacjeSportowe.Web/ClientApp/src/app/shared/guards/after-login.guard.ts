import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {

  constructor(private router: Router,
    private authorizationService: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.authorizationService.isLogged();
  }
}
