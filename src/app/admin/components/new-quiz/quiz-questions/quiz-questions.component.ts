import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { SnackBarComponent } from '../../../../shared/components/snack-bar/snack-bar.component';
import { GLOBALS } from '../../../../shared/core/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomTranslateService } from '../../../../shared/services/custom-translate/custom-translate.service';
import { QuestionInterface } from './question.interface';
import { QuestionOptionInterface } from './question-option.interface';
import { QuizQuestionsService } from './quiz-questions.service';
import { QuizSettingsService } from '../quiz-settings/quiz-settings.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizQuestionsComponent implements OnInit {
  public questions: QuestionInterface[] = [];

  @Input() quizSettingSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private customTranslateService: CustomTranslateService,
    private quizQuestionsService: QuizQuestionsService,
    public quizSettingsService: QuizSettingsService
  ) {}

  ngOnInit(): void {
    if (this.quizSettingsService.quizId) {
      this.getQuestions();
    }
  }

  private getQuestions() {
    this.quizQuestionsService
      .getQuestions(this.quizSettingsService.quizId)
      .subscribe((response) => {
        this.questions = response;
      });
  }

  public addFirstQuestion() {
    let newQuestion: any = {
      name: '',
      type: 'SELECT',
      options: [
        {
          option: this.customTranslateService.getTranslation(
            'admin.quiz.question.newOption'
          ),
          valid: true,
        },
      ],
    };

    this.quizQuestionsService
      .addQuestion(this.quizSettingsService.quizId, newQuestion)
      .subscribe((response) => {
        newQuestion.id = response.id;

        this.questions.push(newQuestion);
      });
  }

  public addOption(question, option) {
    const currentOptionIndex = question.options.indexOf(option);

    const newOption: QuestionOptionInterface = {
      option: this.customTranslateService.getTranslation(
        'admin.quiz.question.newOption'
      ),
      valid: true,
    };

    question.options.splice(currentOptionIndex + 1, 0, newOption);
  }

  public removeOption(question, option) {
    if (question.options.length > 1) {
      _.remove(question.options, function (item) {
        return item === option;
      });
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation(
            'admin.quiz.question.deleteLastOptionMessage'
          ),
          type: GLOBALS.NOTIFICATIONS.ERROR,
        },
      });
    }
  }

  public saveQuestion(question) {
    this.quizQuestionsService.saveQuestion(question).subscribe((response) => {
      if (response.success) {
        this.matSnackBar.openFromComponent(SnackBarComponent, {
          verticalPosition: 'top',
          data: {
            content: this.customTranslateService.getTranslation(
              response.message
            ),
            type: GLOBALS.NOTIFICATIONS.INFO,
          },
        });
      }
    });
  }

  public addQuestion(question) {
    const currentQuestionIndex = this.questions.indexOf(question);

    const newQuestion: QuestionInterface = {
      name: '',
      type: 'SELECT',
      options: [
        {
          option: this.customTranslateService.getTranslation(
            'admin.quiz.question.newOption'
          ),
          valid: true,
        },
      ],
    };

    this.quizQuestionsService
      .addQuestion(this.quizSettingsService.quizId, newQuestion)
      .subscribe((response) => {
        newQuestion.id = response.id;

        this.questions.splice(currentQuestionIndex + 1, 0, newQuestion);
      });
  }

  public removeQuestion(question) {
    if (this.questions.length > 1) {
      this.quizQuestionsService
        .removeQuestion(question.id)
        .subscribe((response) => {
          _.remove(this.questions, (item) => item === question);
        });
    } else
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation(
            'admin.quiz.question.deleteLastQuestionMessage'
          ),
          type: GLOBALS.NOTIFICATIONS.ERROR,
        },
      });
  }
}
