import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GLOBALS } from "../../../../shared/core/globals";
import { PlaceholderFormatService } from "../../../../shared/services/format/placeholder-format.service";

@Injectable({
  providedIn: 'root'
})
export class QuizSettingsService {
  private _quizId;

  constructor(private http: HttpClient,
              private placeholderFormatService: PlaceholderFormatService) { }

  public saveQuizSettings(data): Observable<any> {
    return this.http.post(GLOBALS.DATA_URL.SAVE_QUIZ_SETTINGS, data);
  }

  get quizId() {
    return this._quizId;
  }

  set quizId(value) {
    this._quizId = value;
  }

  public getQuizSettings(): Observable<any> {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_QUIZ_SETTINGS, {
      "{quizId}": this.quizId
    });

    return this.http.get(url);
  }
}
