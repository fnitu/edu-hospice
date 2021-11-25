import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionInterface } from "../../../admin/components/new-quiz/quiz-questions/question.interface";
import { QuizService } from "./quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {
  @Input() quizDetailsUrl: string;
  @Input() quizQuestionsUrl: string;

  public quizDetails = null;
  public quizQuestions: QuestionInterface[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuizDetails()
  }

  private getQuizDetails() {
    this.quizService.getQuizDetails(this.quizDetailsUrl).subscribe((response) => {
      this.quizDetails = response;

      this.quizService.getQuizQuestions(this.quizQuestionsUrl).subscribe((response) => {
        this.quizQuestions = response;
      });
    });
  }

}
