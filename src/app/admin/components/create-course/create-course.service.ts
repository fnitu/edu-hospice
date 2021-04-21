import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateCourse } from 'src/app/shared/interfaces/createCourse';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  constructor(private http: HttpClient) {}

  createCourse(url, data: CreateCourse): Observable<any> {
    const dataResponse = this.http.post<CreateCourse>(url, data);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }
}
