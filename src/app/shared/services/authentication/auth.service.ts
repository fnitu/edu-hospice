import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { GLOBALS } from '../../core/globals';

import { User } from '../../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userDetails: Promise<User>;

  private _userDetailsResponse: Observable<User>;

  constructor(private http: HttpClient) {}

  public get userDetails() {
    if (!this._userDetailsResponse) {
      this._userDetailsResponse = <Observable<User>>(
        this.http.get(GLOBALS.DATA_URL.USER_DETAILS).pipe(share())
      );
    }

    this._userDetails = <Promise<User>>this._userDetailsResponse.toPromise();
    return this._userDetails;
  }

  get accessToken(): string {
    return sessionStorage.getItem('token');
  }

  set accessToken(value: string) {
    sessionStorage.setItem('token', value);
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}
