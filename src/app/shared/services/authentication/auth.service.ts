import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get accessToken(): string {
    return sessionStorage.getItem("token");
  }

  set accessToken(value: string) {
    sessionStorage.setItem("token", value);
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

}
