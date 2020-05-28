import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBALS } from '../../shared/core/globals';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    public login(email, password): Observable<any> {
        const url = `${GLOBALS.BASE_URL}/auth/login`;

        const formData = {'email': email, 'password': password};

        return this.http.post(url, formData);
    }
}
