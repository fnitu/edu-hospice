import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user: User;

  constructor(private http: HttpClient) {
  }

  public login(email, password) {
    const url = 'https://safe-plateau-32477.herokuapp.com/api/auth/login';

    const formData = {'email': email, 'password': password};

    return this.http.post(url, formData);
  }

  public getUserDetails(token) {
    const url = 'https://safe-plateau-32477.herokuapp.com/api/users/currentUser';
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  set user(user: User) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
