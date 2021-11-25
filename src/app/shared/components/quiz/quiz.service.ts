import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizDetails(url): Observable<any> {
    return this.http.get(url);
  }

  public getQuizQuestions(url): Observable<any> {
    return this.http.get(url);
  }
}
