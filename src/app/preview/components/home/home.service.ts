import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getCourses(url) {
    return this.http.get(url);
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
