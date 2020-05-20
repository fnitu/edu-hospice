import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user: User;

  private _accessToken: string;

  public userHasLoggedIn: Subject<boolean> = new Subject<boolean>();

  private readonly BASE_URL = 'https://edu-hospice-api.herokuapp.com/api';

  constructor(private http: HttpClient) {
  }

  public login(email, password) {
    const url = `${this.BASE_URL}/auth/login`;

    const formData = {'email': email, 'password': password};

    return this.http.post(url, formData);
  }

  public getUserDetails(token) {
    const url = `${this.BASE_URL}/users/currentUser`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  set user(user: User) {
    this._user = user;
    if (this._user) {
      this.userHasLoggedIn.next(true);
    }
    else {
      this.userHasLoggedIn.next(false);
    }
  }

  get user() {
    return this._user;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  get accessToken() {
    return this._accessToken;
  }
}
