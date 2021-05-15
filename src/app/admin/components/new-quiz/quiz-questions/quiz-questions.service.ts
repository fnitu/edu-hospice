import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PlaceholderFormatService } from "../../../../shared/services/format/placeholder-format.service";
import { GLOBALS } from "../../../../shared/core/globals";

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {

  constructor(private http: HttpClient,
              private placeHolderFormatService: PlaceholderFormatService) { }

  public addQuestion(quizId, questionConfig): Observable<any> {
    const url = this.placeHolderFormatService.stringFormat(GLOBALS.DATA_URL.ADD_QUIZ_QUESTION, {
      "{quizId}": quizId
    });

    const bodyParams = JSON.stringify(questionConfig);

    return this.http.post(url, bodyParams);
  }

  public saveQuestion(quizId, questionConfig):Observable<any> {
    const url = "";

    const bodyParams = JSON.stringify(questionConfig);

    return this.http.put(url, bodyParams);
  }
}
