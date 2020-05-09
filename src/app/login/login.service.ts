import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(email, password) {
    const url = 'https://safe-plateau-32477.herokuapp.com/api/auth/login';
    const formData = { 'email': email, 'password': password };

    return this.http.post(url, formData);
  }
}
