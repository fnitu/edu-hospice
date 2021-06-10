import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {

  constructor(private http: HttpClient) { }


  public deleteCourse(url): Observable<any> {
    const dataResponse = this.http.delete(url);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }
}
