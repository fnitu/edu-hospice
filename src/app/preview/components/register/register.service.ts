import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  public registerUser(userData) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(GLOBALS.DATA_URL.REGISTER, userData, httpOptions);
  }

  public editUserData(userData) {
    return this.http.put(GLOBALS.DATA_URL.EDIT_USER_DATA, userData);
  }
}
