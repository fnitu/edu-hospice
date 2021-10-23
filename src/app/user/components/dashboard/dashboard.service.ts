import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators';

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

  getCourseInfo(url): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const dataResponse = this.http.get(url, httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }
}
