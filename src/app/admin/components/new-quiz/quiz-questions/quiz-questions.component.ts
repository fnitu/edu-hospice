import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizQuestionsComponent implements OnInit {
  public questions: {
    name: string;
    type: "radio" | "select" | "checkboxes";
    options: {
      option: string;
      valid: boolean;
    }[]
  }[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const quizId = this.route.snapshot.params.id;

    if (quizId) {
      this.getQuestions();
    } else {
      this.initFirstQuestion();
    }


  }

  private getQuestions() {
  //TODO implementation of GET questions request
  }

  private initFirstQuestion() {
    this.questions.push({
      name: "",
      type: "select",
      options: [
        {
          option: "Option 1",
          valid: true
        }
      ]
    });
  }

}
