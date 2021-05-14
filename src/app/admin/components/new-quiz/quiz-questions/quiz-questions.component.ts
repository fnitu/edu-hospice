import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { SnackBarComponent } from "../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../shared/core/globals";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomTranslateService } from "../../../../shared/services/custom-translate/custom-translate.service";
import { QuestionInterface } from "./question.interface";
import { QuestionOptionInterface } from "./question-option.interface";
import { QuizQuestionsService } from "./quiz-questions.service";

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizQuestionsComponent implements OnInit {
  public questions: QuestionInterface[] = [];

  public quizId = null;

  @Input() quizSettingSaved: boolean = false;

  constructor(private route: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private customTranslateService: CustomTranslateService,
              private quizQuestionsService: QuizQuestionsService) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.id;

    if (this.quizId) {
      this.getQuestions();
    }

  }

  private getQuestions() {
  //TODO implementation of GET questions request
  }

  public addFirstQuestion() {
    let newQuestion: any = {
      name: "",
      type: "select",
      options: [
        {
          option: this.customTranslateService.getTranslation("admin.quiz.question.newOption"),
          valid: true
        }
      ]
    };

    this.quizQuestionsService.addQuestion(this.quizId, newQuestion).subscribe(
        (response) => {
          newQuestion.id = response.id;

          this.questions.push(newQuestion);
        }
    );
  }

  public addOption(question, option) {
    const currentOptionIndex = question.options.indexOf(option);

    const newOption: QuestionOptionInterface = {
      option: this.customTranslateService.getTranslation("admin.quiz.question.newOption"),
      valid: true
    };

    question.options.splice(currentOptionIndex + 1, 0, newOption);
  }

  public removeOption(question, option) {
    if (question.options.length > 1) {
      _.remove(question.options, function(item) {
        return item === option;
      });
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation("admin.quiz.question.deleteLastOptionMessage"),
          type: GLOBALS.NOTIFICATIONS.ERROR
        }
      });
    }
  }

  public addQuestion(question) {
      const currentQuestionIndex = this.questions.indexOf(question);

      const newQuestion: QuestionInterface = {
          name: "",
          type: "select",
          options: [
              {
                  option: this.customTranslateService.getTranslation("admin.quiz.question.newOption"),
                  valid: true
              }
          ]
      };

    this.quizQuestionsService.addQuestion(this.quizId, newQuestion).subscribe(
        (response) => {
          newQuestion.id = response.id;

          this.questions.splice(currentQuestionIndex + 1, 0, newQuestion);
        }
    );
  }

  public removeQuestion(question) {
    if (this.questions.length > 1) {
      _.remove(this.questions, function(item) {
        return item === question;
      });
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation("admin.quiz.question.deleteLastQuestionMessage"),
          type: GLOBALS.NOTIFICATIONS.ERROR
        }
      });
    }
  }

}
