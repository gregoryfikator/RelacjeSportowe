import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtAccessTokenService } from './jwt-access-token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private jwtAccessTokenService: JwtAccessTokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: Constants.ApiAddress + req.url,
      withCredentials: true
    });

    return this.processRequestWithToken(this.jwtAccessTokenService.getToken(), req, next)
      .pipe(
        catchError((response) => {
          if (response.status === Constants.StatusCodes.RedirectToLoginPage) {
            this.router.navigate([Constants.Routing.BasicPaths.Login], {
              queryParams: {
                ['redirectUrl']: this.router.routerState.snapshot.url
              }
            });
          } else if (response.status === Constants.StatusCodes.NewAccessTokenCreated) {
            this.jwtAccessTokenService.setToken(response.error.jwtToken);
            return this.processRequestWithToken(this.jwtAccessTokenService.getToken(), req, next);
          } else {
            throwError(response);
          }
        })
      );
  }

  private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
    if (!!token && this.isSameOriginUrl(req)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }

  private isSameOriginUrl(req: any) {

    if (req.url.startsWith(`${environment.apiAddress}`)) {
      return true;
    }

    // It's an absolute url with the same origin.
    if (req.url.startsWith(`${window.location.origin}/`)) {
      return true;
    }

    // It's a protocol relative url with the same origin.
    // For example: //www.example.com/api/Products
    if (req.url.startsWith(`//${window.location.host}/`)) {
      return true;
    }

    // It's a relative url like /api/Products
    if (/^\/[^\/].*/.test(req.url)) {
      return true;
    }

    // It's an absolute or protocol relative url that
    // doesn't have the same origin.
    return false;
  }
}
