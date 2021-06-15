import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizListService {
  constructor(private http: HttpClient) {}

  public removeQuiz(url) {
    return this.http.delete(url);
  }
}
