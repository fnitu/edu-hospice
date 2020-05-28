import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;

  get accessToken(): string {
    return sessionStorage.getItem("token");
  }

  set accessToken(value: string) {
    this._token = value;

    sessionStorage.setItem("token", this._token);
  }

  public isAuthenticated(): boolean {
    return !!this._token;
  }

}
