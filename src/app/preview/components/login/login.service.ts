import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBALS } from '../../../shared/core/globals';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    public user: User;

    public login(email, password): Observable<any> {
        const url = GLOBALS.DATA_URL.LOGIN;

        const formData = {email, password};

        return this.http.post(url, formData);
    }

    get userDetails(): User {
      return this.user;
    }

    set userDetails(value: User) {
      this.user =  value;
    }
}
