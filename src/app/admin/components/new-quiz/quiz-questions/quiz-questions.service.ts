import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlaceholderFormatService } from '../../../../shared/services/format/placeholder-format.service';
import { GLOBALS } from '../../../../shared/core/globals';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsService {
  constructor(
    private http: HttpClient,
    private placeHolderFormatService: PlaceholderFormatService
  ) {}

  public addQuestion(quizId, questionConfig): Observable<any> {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.ADD_QUIZ_QUESTION,
      {
        '{quizId}': quizId,
      }
    );

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const bodyParams = JSON.stringify(questionConfig);

    return this.http.post(url, bodyParams, httpOptions);
  }

  public saveQuestion(questionConfig): Observable<any> {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.SAVE_QUIZ_QUESTION,
      {
        '{questionId}': questionConfig.id,
      }
    );

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const bodyParams = JSON.stringify(questionConfig);

    return this.http.put(url, bodyParams, httpOptions);
  }

  public getQuestions(quizId): Observable<any> {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.GET_QUIZ_QUESTIONS,
      {
        '{quizId}': quizId,
      }
    );

    return this.http.get(url);
  }

  public removeQuestion(questionId) {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.DELETE_QUIZ_QUESTION,
      { '{questionId}': questionId }
    );
    return this.http.delete(url);
  }
}
