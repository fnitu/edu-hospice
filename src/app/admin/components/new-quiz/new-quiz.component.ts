import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTES } from "../../../shared/core/routes";
import { CustomTranslateService } from "../../../shared/services/custom-translate/custom-translate.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PreviewQuizDialogComponent } from "../preview-quiz-dialog/preview-quiz-dialog.component";

@Component({
    selector: 'app-new-quiz',
    templateUrl: './new-quiz.component.html',
    styleUrls: ['./new-quiz.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewQuizComponent implements OnInit {
    public quizSettingSaved: boolean = false;
    public pageActions = [];

    constructor(private customTranslateService: CustomTranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        // if id is present on route, the quiz is saved
        if (this.route.snapshot.params.id) {
            this.quizSettingSaved = true;
        }

        this.pageActions = this.generatePageActions();
    }

    public quizSettingsSavedEventHandler() {
        this.quizSettingSaved = true;

        // rebuild page actions after a quiz is saved first time
        this.pageActions = this.generatePageActions();
    }

    private generatePageActions(): {}[] {
        let actions = [
            {
                label: this.customTranslateService.getTranslation('admin.quiz.showAllQuizzes'),
                handler: () => {
                    this.router.navigate([ROUTES.ADMIN.QUIZ.LIST], {
                        relativeTo: this.route.parent.parent,
                    });
                }
            },
            {
                label: this.customTranslateService.getTranslation('admin.quiz.list.addQuizButton'),
                handler: () => {
                    this.router.navigate([ROUTES.ADMIN.QUIZ.NEW], {
                        relativeTo: this.route.parent,
                    });
                }
            }
        ];

        // display preview button only if quiz is saved
        if (this.quizSettingSaved) {
            actions.push({
                label: this.customTranslateService.getTranslation('admin.quiz.previewQuiz'),
                handler: () => this.openPreviewQuizDialog()
            });
        }

        return actions;
    }

    private openPreviewQuizDialog() {
        this.dialog.open(PreviewQuizDialogComponent, {
            height: "95vh",
            width: "60vw"
        });
    }
}
