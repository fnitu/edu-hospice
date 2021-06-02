import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {CreateCourse} from '../../../../shared/interfaces/createCourse';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseInfoService {

  constructor(private http: HttpClient) { }

  createCourse(url, data: CreateCourse): Observable<any> {
    const dataResponse = this.http.post<CreateCourse>(url, data);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  public getCourseInfo(url): Observable<any> {
    const dataResponse = this.http.get<CreateCourse>(url);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }
}
