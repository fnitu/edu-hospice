import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RecoverPasswordEnterEmailService {

    constructor(private http: HttpClient) {
    }

    public sendEmailForRecoverPassword(url: string, data: any): Observable<any> {
        const bodyParams = data ? JSON.stringify(data) : null;
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.post(url, bodyParams, httpOptions);
    }
}
