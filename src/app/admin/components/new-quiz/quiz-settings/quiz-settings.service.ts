import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GLOBALS } from "../../../../shared/core/globals";

@Injectable({
  providedIn: 'root'
})
export class QuizSettingsService {
  private _quizId;

  constructor(private http: HttpClient) { }

  public saveQuizSettings(data): Observable<any> {
    return this.http.post(GLOBALS.DATA_URL.SAVE_QUIZ_SETTINGS, data);
  }

  get quizId() {
    return this._quizId;
  }

  set quizId(value) {
    this._quizId = value;
  }
}
