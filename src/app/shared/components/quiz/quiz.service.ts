import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { QuestionInterface } from "../../../admin/components/new-quiz/quiz-questions/question.interface";

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

  public transformSettingsModel(questions): QuestionInterface[] {
    const questionsModel: QuestionInterface[] = [];

    questions.forEach((value) => {
      const newSettings = {};

      value.settings.forEach((setting) => {
        newSettings[setting.name] = setting.value;
      });

      questionsModel.push({...value, settings: newSettings});
    });

    return questionsModel;
  }
}
