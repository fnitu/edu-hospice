import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  public getStatusInfo(): Observable<any> {
    return this.http.get(GLOBALS.DATA_URL.ADMIN_DASHBOARD_STATS);
  }
}
