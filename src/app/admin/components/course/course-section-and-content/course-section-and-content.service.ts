import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionAndContentService {

  constructor(private http: HttpClient) { }

  getCourseInfo(url): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.get(url, httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  addSection(url, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.post(url, JSON.stringify(data), httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  updateSectionName(url, data): Observable<any> {
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

  public deleteSection(url): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.delete(url, httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  addContent(url, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.post(url, JSON.stringify(data), httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  updateContentName(url, data): Observable<any> {
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

  public deleteContent(url): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const dataResponse = this.http.delete(url, httpOptions);

    dataResponse.pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

    return dataResponse;
  }

  public getSections(url): Observable<any> {
    return this.http.get(url);
  }

  updateSectionVisibility(url, data): Observable<any> {
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
}
