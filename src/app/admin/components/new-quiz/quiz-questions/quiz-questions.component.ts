import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { SnackBarComponent } from "../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../shared/core/globals";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomTranslateService } from "../../../../shared/services/custom-translate/custom-translate.service";

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

  constructor(private route: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private customTranslateService: CustomTranslateService) { }

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
          option: this.customTranslateService.getTranslation("admin.quiz.question.newOption"),
          valid: true
        }
      ]
    });
  }

  public addOption(question, option) {
    const currentOptionIndex = question.options.indexOf(option);

    const newOption = {
      option: this.customTranslateService.getTranslation("admin.quiz.question.newOption"),
      valid: true
    }

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

  public addQuestion() {

  }

  public removeQuestion() {

  }

}
