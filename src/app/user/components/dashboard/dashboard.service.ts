import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBALS, USER_DETAILS } from '../../../shared/core/globals';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  public fetchCourseTabs(): Observable<any> {
    const url = './assets/json/courseTabs.json';

    return this.http.get(url);
  }

  public fetchTabData(url): Observable<any> {
    return this.http.get(url);
  }

  public userDetails(id: number) {
    const url = USER_DETAILS(id);
    return this.http.get<User>(url);
  }
}
