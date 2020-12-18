import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordEnterEmailService {

  constructor(private http: HttpClient) { }

  public verifyPassword(url: string, data: any): Observable<any> {
    const bodyParams = data ? JSON.stringify(data) : null;

    return this.http.request('GET', url, {
      body: bodyParams
    });
  }
}
