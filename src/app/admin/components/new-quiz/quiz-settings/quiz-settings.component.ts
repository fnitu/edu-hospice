import { Component, EventEmitter, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomTranslateService } from "../../../../shared/services/custom-translate/custom-translate.service";
import { QuizSettingsService } from "./quiz-settings.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../shared/core/globals";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterUtilsService } from "../../../../shared/services/router/router-utils.service";
import { ConfirmationDialogService } from "../../../../shared/components/confirmation-dialog/confirmation-dialog.service";

export enum QUIZ_TYPE {
    FEEDBACK_QUIZ = 'FEEDBACK_QUIZ',
    KNOWLEDGE_QUIZ= 'KNOWLEDGE_QUIZ'
}

enum QUIZ_STATUS {
    ACTIVE ='ACTIVE',
    INACTIVE = 'INACTIVE'
}

interface QuizSettings {
    id: number;
    minScore: number;
    name: string;
    restrictNextContent: boolean;
    retryAttempts: number;
    shuffle: boolean;
    status: QUIZ_STATUS;
    timeLimit: number;
    type: QUIZ_TYPE
}

@Component({
    selector: 'app-quiz-settings',
    templateUrl: './quiz-settings.component.html',
    styleUrls: ['./quiz-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuizSettingsComponent implements OnInit {
    @Output() quizSettingsSavedEvent = new EventEmitter();

    @Output() quizTypeChanged = new EventEmitter();

    public settingsForm = new FormGroup({});

    public settingsFormFields: FormlyFieldConfig[];

    public settingsFormModel: Partial<QuizSettings> = {
        shuffle: false,
        status: QUIZ_STATUS.INACTIVE
    };

    constructor(private customTranslateService: CustomTranslateService,
                private quizSettingsService: QuizSettingsService,
                private matSnackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
                private routerUtilsService: RouterUtilsService,
                private confirmationDialogService: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        this.quizSettingsService.quizId = this.route.snapshot.params.id;

        if (this.quizSettingsService.quizId) {
            this.getQuizSettings();
        }

        this.settingsFormFields = this.defineSettingFormFields();
    }

    private getQuizSettings() {
        this.quizSettingsService.getQuizSettings().subscribe(
            (response) => {
                this.settingsFormModel = response;

                this.quizSettingsService.quizType = this.settingsFormModel.type;
            }
        );
    }

    private defineSettingFormFields(): FormlyFieldConfig[] {
        return [
            {
                key: "status"
            },
            {
                fieldGroupClassName: "row-layout",
                fieldGroup: [
                    {
                        key: "name",
                        type: "input",
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.titleLabel"),
                            placeholder: this.customTranslateService.getTranslation("admin.quiz.settings.titlePlaceholder"),
                            required: true
                        },
                        validators: {
                            validation: [Validators.required],
                        }
                    },
                    {
                        key: 'type',
                        type: 'select',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeLabel"),
                            placeholder: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeLabel"),
                            required: true,
                            options: [
                                {value: QUIZ_TYPE.KNOWLEDGE_QUIZ, label: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeKnowledge")},
                                {value: QUIZ_TYPE.FEEDBACK_QUIZ, label: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeFeedback")}
                            ],
                            change: (field, event) => this.onChangeQuizTypeHandler(event)
                        },
                        validators: {
                            validation: [Validators.required],
                        }
                    },
                ]
            },
            {
                fieldGroupClassName: "row-layout",
                fieldGroup: [
                    {
                        key: 'minScore',
                        type: 'select',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.minimumScoreLabel"),
                            placeholder: this.customTranslateService.getTranslation("admin.quiz.settings.minimumScorePlaceholder"),
                            required: true,
                            options: [
                                {value: 50, label: '50'},
                                {value: 60, label: '60'},
                                {value: 70, label: '70'},
                            ]
                        },
                        validators: {
                            validation: [Validators.required],
                        }
                    },
                    {
                        key: 'retryAttempts',
                        type: 'select',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.retryAttemptsLabel"),
                            placeholder: this.customTranslateService.getTranslation("admin.quiz.settings.retryAttemptsPlaceholder"),
                            required: true,
                            options: [
                                {value: 1, label: '1'},
                                {value: 2, label: '2'},
                                {value: 3, label: '3'},
                                {value: 4, label: '4'},
                            ]
                        },
                        validators: {
                            validation: [Validators.required],
                        }
                    },
                    {
                        key: 'timeLimit',
                        type: 'select',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.timeLimitLabel"),
                            placeholder: this.customTranslateService.getTranslation("admin.quiz.settings.timeLimitPlaceholder"),
                            required: true,
                            options: [
                                {
                                    value: 30,
                                    label: `30 ${this.customTranslateService.getTranslation("general.minutes")}`
                                },
                                {
                                    value: 40,
                                    label: `40 ${this.customTranslateService.getTranslation("general.minutes")}`
                                },
                                {
                                    value: 50,
                                    label: `50 ${this.customTranslateService.getTranslation("general.minutes")}`
                                },
                                {
                                    value: 60,
                                    label: `60 ${this.customTranslateService.getTranslation("general.minutes")}`
                                },
                            ]
                        },
                        validators: {
                            validation: [Validators.required],
                        }
                    }
                ],
                hideExpression: `field.parent.model.type !== '${QUIZ_TYPE.KNOWLEDGE_QUIZ}'`
            },
            {
                fieldGroupClassName: "row-layout",
                fieldGroup: [
                    {
                        key: 'shuffle',
                        type: 'toggle',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.shuffleQuestionsLabel")
                        }
                    },
                    {
                        key: 'restrictNextContent',
                        type: 'toggle',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.restrictedNextContentLabel")
                        }
                    }
                ],
                hideExpression: `field.parent.model.type !== '${QUIZ_TYPE.KNOWLEDGE_QUIZ}'`
            }
        ]
    }

    public saveQuizSettings() {
        if (this.quizSettingsService.quizId) {
            this.updateExistingQuizSettings()
        } else {
            this.saveNewQuizSettings();
        }
    }

    private saveNewQuizSettings() {
        this.quizSettingsService.saveNewQuizSettings(this.settingsForm.value).subscribe(
            (response) => {
                this.quizSettingsSavedEvent.emit();

                this.matSnackBar.openFromComponent(SnackBarComponent, {
                    verticalPosition: 'top',
                    data: {
                        content: this.customTranslateService.getTranslation("admin.quiz.settings.quizCreatedSuccessMessage"),
                        type: GLOBALS.NOTIFICATIONS.INFO
                    }
                });

                this.quizSettingsService.quizId = response.id;

                this.routerUtilsService.updateRouteUrl(this.router.url,
                    /\/quiz-list\/quiz.*$/, `/quiz-list/quiz/${this.quizSettingsService.quizId}`);

                this.quizSettingsService.quizType = this.settingsFormModel.type;
            }
        );
    }

    private updateExistingQuizSettings() {
        this.quizSettingsService.updateExistingQuizSettings(this.settingsForm.value).subscribe(
            (response) => {
                this.matSnackBar.openFromComponent(SnackBarComponent, {
                    verticalPosition: 'top',
                    data: {
                        content: this.customTranslateService.getTranslation("admin.quiz.settings.quizUpdatedSuccessMessage"),
                        type: GLOBALS.NOTIFICATIONS.INFO
                    }
                });

                this.quizSettingsService.quizType = this.settingsFormModel.type;
            }
        );
    }

    private onChangeQuizTypeHandler(event) {
        if (this.quizSettingsService.quizType) {
            this.showConfirmationQuizChange(event.value);
        }

    }

    private showConfirmationQuizChange(value) {
        const dialogRef = this.confirmationDialogService.show({
            data: {
                title: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeChangeConfirmationTitle"),
                message: this.customTranslateService.getTranslation("admin.quiz.settings.quizTypeChangeConfirmationMessage"),
                buttons: [
                    {
                        text: this.customTranslateService.getTranslation('general.cancel'),
                        handler: () => {
                            this.settingsFormModel.type = this.quizSettingsService.quizType;
                            this.settingsForm.get('type').setValue(this.quizSettingsService.quizType);

                            dialogRef.close();
                        },
                    },
                    {
                        text: this.customTranslateService.getTranslation('general.confirm'),
                        handler: () => {
                            this.quizSettingsService.quizType = value;
                            this.quizTypeChanged.emit();

                            dialogRef.close();
                        }
                    }
                ]
            }
        });
    }
}
