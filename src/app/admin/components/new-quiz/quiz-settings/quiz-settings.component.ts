import { Component, EventEmitter, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { CustomTranslateService } from "../../../../shared/services/custom-translate/custom-translate.service";
import { QuizSettingsService } from "./quiz-settings.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../shared/core/globals";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'

@Component({
    selector: 'app-quiz-settings',
    templateUrl: './quiz-settings.component.html',
    styleUrls: ['./quiz-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuizSettingsComponent implements OnInit {
    @Output() quizSettingsSavedEvent = new EventEmitter();

    public settingsForm = new FormGroup({});

    public settingsFormFields: FormlyFieldConfig[];

    public settingsFormModel = {
        shuffle: false,
        status: "INACTIVE"
    };

    constructor(private customTranslateService: CustomTranslateService,
                private quizSettingsService: QuizSettingsService,
                private matSnackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
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
            }
        );
    }

    private defineSettingFormFields(): FormlyFieldConfig[] {
        return [
            {
                key: "status"
            },
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
                ]
            },
            {
                key: 'shuffle',
                type: 'toggle',
                templateOptions: {
                    label: this.customTranslateService.getTranslation("admin.quiz.settings.shuffleQuestionsLabel")
                }
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

                this.updateRouteUrl(response.id);
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
            }
        );
    }

    private updateRouteUrl(id) {
        let url = this.router.url;

        const regex = /\/quiz-list\/quiz.*$/;

        url = url.replace(regex, `/quiz-list/quiz/${id}`);

        // https://stackoverflow.com/questions/35618463/change-route-params-without-reloading-in-angular-2
        this.location.go(url);
    }
}
