import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { SnackBarComponent } from '../../../../shared/components/snack-bar/snack-bar.component';
import { GLOBALS } from '../../../../shared/core/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomTranslateService } from '../../../../shared/services/custom-translate/custom-translate.service';
import { QuestionInterface } from './question.interface';
import { QuizQuestionsService } from './quiz-questions.service';
import { QuizSettingsService } from '../quiz-settings/quiz-settings.service';
import { OptionsFieldConfigurationService } from './options-field-configuration/options-field-configuration.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-quiz-questions',
    templateUrl: './quiz-questions.component.html',
    styleUrls: ['./quiz-questions.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class QuizQuestionsComponent implements OnInit {
    @ViewChildren('questionRef', {read: ElementRef}) questionRef: QueryList<ElementRef>;
    @Input() quizSettingSaved: boolean = false;

    public questions: QuestionInterface[] = [];

    public readonly FIELD_TYPES = GLOBALS.FIELD_TYPES;

    private questionAdded: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private matSnackBar: MatSnackBar,
        private customTranslateService: CustomTranslateService,
        private quizQuestionsService: QuizQuestionsService,
        public quizSettingsService: QuizSettingsService,
        private optionsFieldConfigurationService: OptionsFieldConfigurationService) {
    }

    ngOnInit(): void {
        if (this.quizSettingsService.quizId) {
            this.getQuestions();
        }
    }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    private getQuestions() {
        this.quizQuestionsService
            .getQuestions(this.quizSettingsService.quizId)
            .subscribe((response) => {
                this.questions = response;
            });
    }

    public addQuestion() {
        const newQuestion: QuestionInterface = this.getDefaultQuestionModel();

        this.quizQuestionsService
            .addQuestion(this.quizSettingsService.quizId, newQuestion)
            .subscribe((response) => {
                newQuestion.id = response.id;

                this.questions.push(newQuestion);

                this.questionAdded = true;
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
                    type: GLOBALS.NOTIFICATIONS.ERROR
                }
            });
    }

    private getDefaultQuestionModel(): QuestionInterface {
        return {
            name: this.customTranslateService.getTranslation('admin.quiz.question.newQuestion'),
            type: <any>this.FIELD_TYPES.SELECT,
            options: [
                this.optionsFieldConfigurationService.getDefaultOptionModel(true)
            ]
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
            messageTemplate += `<div>${this.customTranslateService.getTranslation('admin.quiz.question.saveEmptyQuestionNameErrorMessage')}</div>`;
        }

        if (!hasValidOptionChecked) {
            messageTemplate += `<div>${this.customTranslateService.getTranslation('admin.quiz.question.hasValidOptionCheckedErrorMessage')}</div>`;
        }

        return messageTemplate;
    }

    public selectionChangeHandler(question: QuestionInterface) {
        switch (question.type) {
            case this.FIELD_TYPES.TEXTAREA_SHORT:
            case this.FIELD_TYPES.TEXTAREA_BIG: {
                question.options = null;
                delete question.settings;
                break;
            }
            case this.FIELD_TYPES.SELECT:
            case this.FIELD_TYPES.RADIO:
            case this.FIELD_TYPES.CHECKBOXES: {
                delete question.settings;

                if (!question.options.length) {
                    question.options = [this.optionsFieldConfigurationService.getDefaultOptionModel()];
                } else {
                    this.optionsFieldConfigurationService.resetOptionsValidState(question);
                }
                break;
            }
            case this.FIELD_TYPES.LINEAR_SCALE: {
                question.options = null;
                delete question.settings;
            }
        }
    }

    public onListDropped(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.questions, event.previousIndex, event.currentIndex);

        this.quizQuestionsService.reorderQuestions(this.quizSettingsService.quizId, {ids: this.prepareQuizQuestionsList() }).subscribe();
    }

    private prepareQuizQuestionsList(): number[] {
        let questionsList: number[];

        questionsList = _.map(this.questions, (value, index) => {
            return value.id;
        });

        return questionsList;
    }

    private scrollToBottom() {
        this.questionRef.changes.subscribe(t => {
            if (this.questionAdded) {
                this.questionRef.last.nativeElement.scrollIntoView();

                this.questionAdded = false;
            }
        });
    }
}
