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

    public readonly FIELD_TYPES = GLOBALS.FIELD_TYPES;

    public readonly TEXTAREA_SHORT_LIMIT = GLOBALS.TEXTAREA.SHORT_LIMIT;
    public readonly TEXTAREA_BIG_LIMIT = GLOBALS.TEXTAREA.BIG_LIMIT;

    public readonly TEXTAREA_MAX_ROWS = GLOBALS.TEXTAREA.MAX_ROWS;
    public readonly TEXTAREA_MIN_ROWS = GLOBALS.TEXTAREA.MIN_ROWS;

    @Input() quizSettingSaved: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private matSnackBar: MatSnackBar,
        private customTranslateService: CustomTranslateService,
        private quizQuestionsService: QuizQuestionsService,
        public quizSettingsService: QuizSettingsService) {
    }

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
        const newQuestion: QuestionInterface = this.getDefaultQuestionModel();

        this.quizQuestionsService
            .addQuestion(this.quizSettingsService.quizId, newQuestion)
            .subscribe((response) => {
                newQuestion.id = response.id;

                this.questions.push(newQuestion);
            });
    }

    private getDefaultOptionModel(): QuestionOptionInterface {
        return {
            option: this.customTranslateService.getTranslation('admin.quiz.question.newOption'),
            valid: false
        }
    }

    private getDefaultQuestionModel(): QuestionInterface {
        return {
            name: this.customTranslateService.getTranslation('admin.quiz.question.newQuestion'),
            type: <any>this.FIELD_TYPES.SELECT,
            options: [
                this.getDefaultOptionModel()
            ]
        }
    }

    public addOption(question, option) {
        const currentOptionIndex = question.options.indexOf(option);

        const newOption: QuestionOptionInterface = this.getDefaultOptionModel();

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
                }
            });
        }
    }

    public saveQuestion(question) {
        let hasQuestionName = !!question.name;
        let hasValidOptionChecked = true;

        if ([this.FIELD_TYPES.RADIO, this.FIELD_TYPES.SELECT, this.FIELD_TYPES.CHECKBOXES].indexOf(question.type) !== -1) {
            // check if question has at least one option checked as valid
            hasValidOptionChecked = _.filter(question.options, "valid").length !== 0;
        }

        if (hasQuestionName && hasValidOptionChecked) {
            this.quizQuestionsService.saveQuestion(question).subscribe((response) => {
                if (response.success) {
                    this.matSnackBar.openFromComponent(SnackBarComponent, {
                        verticalPosition: 'top',
                        data: {
                            content: this.customTranslateService.getTranslation(
                                response.message
                            ),
                            type: GLOBALS.NOTIFICATIONS.INFO,
                        }
                    });
                }
            });
        } else {
            this.matSnackBar.openFromComponent(SnackBarComponent, {
                verticalPosition: 'top',
                data: {
                    contentAsHTML: this.buildSaveQuestionErrorMessage(hasQuestionName, hasValidOptionChecked),
                    type: GLOBALS.NOTIFICATIONS.ERROR,
                }
            });
        }
    }

    private buildSaveQuestionErrorMessage(hasQuestionName, hasValidOptionChecked): string {
        let messageTemplate = "";

        if (!hasQuestionName) {
            messageTemplate += `<div>${this.customTranslateService.getTranslation('admin.quiz.question.saveEmptyQuestionNameErrorMessage')}</div>`
        }

        if(!hasValidOptionChecked) {
            messageTemplate += `<div>${this.customTranslateService.getTranslation('admin.quiz.question.hasValidOptionCheckedErrorMessage')}</div>`
        }

        return messageTemplate;
    }

    public addQuestion(question) {
        const currentQuestionIndex = this.questions.indexOf(question);

        const newQuestion: QuestionInterface = this.getDefaultQuestionModel();

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
                }
            });
    }

    public validOptionChanged($event, question, option) {
        if (question.type === this.FIELD_TYPES.RADIO || question.type === this.FIELD_TYPES.SELECT) {
            QuizQuestionsComponent.resetOptionsValidState(question);
        }

        option.valid = $event.checked;
    }

    private static resetOptionsValidState(question) {
        _.each(question.options, (option) => {
            option.valid = false;
        });
    }
}
