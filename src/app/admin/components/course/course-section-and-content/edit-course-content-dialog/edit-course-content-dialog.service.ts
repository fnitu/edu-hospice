import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { GLOBALS } from 'src/app/shared/core/globals';

@Injectable({
  providedIn: 'root'
})
export class EditCourseContentDialogService {

  constructor(private http: HttpClient) { }

  updateContent(url, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.put(url, JSON.stringify(data), httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  getQuizList() {
    let params = new HttpParams().set("type", "template");
    return this.http.get(GLOBALS.DATA_URL.GET_QUIZ_LIST, {params: params})
  }
}
