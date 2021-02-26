import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  public readonly USER_LIST_TYPES = {
    PAYMENT: 'payment', // waiting after course payment
    REGISTRATION: 'registration', // waiting after course registration,
    ALL: 'all',
  };

  constructor(private http: HttpClient) {}

  public getStatusInfo(): Observable<any> {
    return this.http.get(GLOBALS.DATA_URL.ADMIN_DASHBOARD_STATS);
  }
}
