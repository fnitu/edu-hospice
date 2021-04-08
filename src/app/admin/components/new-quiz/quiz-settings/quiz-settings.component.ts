import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomTranslateService } from "../../../../shared/services/custom-translate/custom-translate.service";
import { QuizSettingsService } from "./quiz-settings.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../shared/core/globals";

@Component({
    selector: 'app-quiz-settings',
    templateUrl: './quiz-settings.component.html',
    styleUrls: ['./quiz-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuizSettingsComponent implements OnInit {
    public settingsForm = new FormGroup({});

    public settingsFormFields: FormlyFieldConfig[];

    public settingsFormModel = {
        shuffle: false,
        status: this.customTranslateService.getTranslation("admin.quiz.settings.statusInactiveValue")
    };

    constructor(private customTranslateService: CustomTranslateService,
                private quizSettingsService: QuizSettingsService,
                private matSnackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.settingsFormFields = this.defineSettingFormFields();
    }

    private defineSettingFormFields(): FormlyFieldConfig[] {
        return [
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
                                {value: 30, label: `30 ${this.customTranslateService.getTranslation("general.minutes")}`},
                                {value: 40, label: `40 ${this.customTranslateService.getTranslation("general.minutes")}`},
                                {value: 50, label: `50 ${this.customTranslateService.getTranslation("general.minutes")}`},
                                {value: 60, label: `60 ${this.customTranslateService.getTranslation("general.minutes")}`},
                            ]
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
                        key: 'shuffle',
                        type: 'toggle',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.shuffleQuestionsLabel")
                        }
                    },
                    {
                        key: 'status',
                        type: 'input',
                        templateOptions: {
                            label: this.customTranslateService.getTranslation("admin.quiz.settings.statusLabel"),
                            readonly: true
                        }
                    }
                ]
            }
        ]
    }

    public saveQuizSettings() {
        this.quizSettingsService.saveQuizSettings(this.settingsForm.value).subscribe(
            (response) => {
                if (response.success) {
                    this.matSnackBar.openFromComponent(SnackBarComponent, {
                        verticalPosition: 'top',
                        data: {
                            content: response.message,
                            type: GLOBALS.NOTIFICATIONS.INFO
                        }
                    });
                }
            }
        );
    }

}
