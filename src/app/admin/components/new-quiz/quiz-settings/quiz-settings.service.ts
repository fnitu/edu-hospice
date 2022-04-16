import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBALS } from "../../../../shared/core/globals";
import { PlaceholderFormatService } from "../../../../shared/services/format/placeholder-format.service";
import { QUIZ_TYPE } from "./quiz-settings.component";

@Injectable({
  providedIn: 'root'
})
export class QuizSettingsService {
  private _quizId;
  private _quizType: QUIZ_TYPE;

  constructor(private http: HttpClient,
              private placeholderFormatService: PlaceholderFormatService) { }

  get quizId() {
    return this._quizId;
  }

  set quizId(value) {
    this._quizId = value;
  }

  get quizType(): QUIZ_TYPE {
    return this._quizType;
  }

  set quizType(value: QUIZ_TYPE) {
    this._quizType = value;
  }

  public saveNewQuizSettings(data): Observable<any> {
    return this.http.post(GLOBALS.DATA_URL.SAVE_QUIZ_SETTINGS, data);
  }

  public updateExistingQuizSettings(data): Observable<any> {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_EXISTING_QUIZ_SETTINGS, {
      "{quizId}": this.quizId
    });

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const bodyParams = JSON.stringify(data);

    return this.http.put(url, bodyParams, httpOptions);
  }

  public getQuizSettings(): Observable<any> {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_QUIZ_SETTINGS, {
      "{quizId}": this.quizId
    });

    return this.http.get(url);
  }
}
