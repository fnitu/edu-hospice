import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({ providedIn: 'root' })
export class AdminEditInfoService {
  constructor(private http: HttpClient) {}

  getAdminPersonalData() {
    // this.http.get(GLOBALS.----------)
  }
  setNewPassword() {
    // this.http.post()
  }
}
