import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { publishReplay, share } from 'rxjs/operators';
import { GLOBALS } from '../../core/globals';

import { User } from '../../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: Promise<User>;

  private _currentUserResponse: ConnectableObservable<User>;

  constructor(private http: HttpClient) {}

  public get currentUser() {
    if (!this._currentUserResponse) {
      this._currentUserResponse = <ConnectableObservable<User>>(
        this.http.get(GLOBALS.DATA_URL.CURRENT_USER).pipe(share())
      );
    }

    this._currentUser = <Promise<User>>this._currentUserResponse.toPromise();
    return this._currentUser;
  }

  public get currentUserResponse() {

    if (!this._currentUserResponse) {

    this._currentUserResponse = <ConnectableObservable<User>>(
      this.http.get(GLOBALS.DATA_URL.CURRENT_USER).pipe(publishReplay())
    );
    this._currentUserResponse.connect();
  }

  return this._currentUserResponse;
}

public set currentUserResponse(currentUserResponse) {
    this._currentUserResponse = currentUserResponse;
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
