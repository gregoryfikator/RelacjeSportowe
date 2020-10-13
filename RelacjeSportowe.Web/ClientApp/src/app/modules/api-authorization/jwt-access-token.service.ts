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
    return localStorage.getItem('jwt');
  }

  public hasToken(): boolean {
    return this.getToken() != null;
  }

  public removeToken(): void {
    localStorage.removeItem('jwt');
  }

  public setToken(newToken: string): void {
    localStorage.setItem('jwt', newToken);
  }
}
