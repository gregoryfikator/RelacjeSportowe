import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtAccessTokenService {

  constructor() {
  }

  public decodeToken(token: string) {
    return jwt_decode(token);
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
