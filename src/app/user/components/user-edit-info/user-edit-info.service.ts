import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({
  providedIn: 'root',
})
export class UserEditInfoService {
  constructor(private http: HttpClient) {}

  public getUserDetails() {
    return this.http.get(GLOBALS.DATA_URL.USER_ALL_DETAILS);
  }
}
