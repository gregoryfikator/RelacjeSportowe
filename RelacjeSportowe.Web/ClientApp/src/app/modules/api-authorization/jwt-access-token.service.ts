import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthorizationRole } from 'src/app/models/enums/authorization-role.enum';

@Injectable({
  providedIn: 'root'
})
export class JwtAccessTokenService {

  constructor() {
  }

  public decodeToken(token: string): any {
    return jwt_decode(token);
  }

  public getUserRole(): AuthorizationRole {
    var token = this.getToken();
    if (token) {
      var decodedToken = this.decodeToken(token);
      return AuthorizationRole[decodedToken["role"] as keyof typeof AuthorizationRole];
    }

    return null;
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public hasToken(): boolean {
    return this.getToken() != null;
  }

  public removeToken(): void {
    localStorage.removeItem('access_token');
  }

  public setToken(newToken: string): void {
    localStorage.setItem('access_token', newToken);
  }
}
