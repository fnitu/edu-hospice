import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public testRegister(){
    const url = 'https://safe-plateau-32477.herokuapp.com/api/auth/register';
    return this.http.get(url);
  }
}
