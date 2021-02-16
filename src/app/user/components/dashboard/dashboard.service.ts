import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  public fetchCourseTabs(url): Observable<any> {
    return this.http.get(url);
  }

  public fetchTabData(url): Observable<any> {
    return this.http.get(url);
  }

  public userDetails(url) {
    return this.http.get<User>(url);
  }
}
