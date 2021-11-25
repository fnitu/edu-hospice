import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GridPropertiesInterface } from 'src/app/shared/components/grid/grid-properties.interface';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { ROUTES } from '../../../shared/core/routes';
import { GLOBALS } from 'src/app/shared/core/globals';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceholderFormatService } from 'src/app/shared/services/format/placeholder-format.service';
import { QuizListService } from './quiz-list.service';
import { PreviewQuizDialogComponent } from "../preview-quiz-dialog/preview-quiz-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizListComponent implements OnInit {
  @ViewChild('gridComponent') gridComponent;

  public gridProperties: GridPropertiesInterface;
  public gridColumns: any[];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private customTranslateService: CustomTranslateService,
    private confirmationDialogService: ConfirmationDialogService,
    private matSnackBar: MatSnackBar,
    private placeholderFormatService: PlaceholderFormatService,
    private quizListService: QuizListService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.gridColumns = this.getGridColumns();
    this.gridProperties = this.getGridProperties();
  }

  private getGridColumns() {
    return [
      {
        headerName:
          this.customTranslateService.getTranslation('general.actions'),
        field: 'actions',
        cellRenderer: 'rowActionsCellRenderer',
        maxWidth: 160,
        minWidth: 120,
        cellRendererParams: {
          actions: [
            {
              label: this.customTranslateService.getTranslation('general.edit'),
              icon: 'edit',
              handler: (params) => this.onBtnClick(params),
            },
            {
              label: this.customTranslateService.getTranslation('general.delete'),
              icon: 'delete_forever',
              cls: 'action-red',
              handler: (params) => this.deleteQuiz(params),
            },
            {
              label: this.customTranslateService.getTranslation('admin.quiz.previewQuiz'),
              icon: 'preview',
              handler: (params) => this.openPreviewQuizDialog(),
            }
          ]
        },
        sortable: false,
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.quizName'
        ),
        field: 'name',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.quizStatus'
        ),
        field: 'status',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.numberOfQuestions'
        ),
        field: 'countAssignedQuestions',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.lastUpdate'
        ),
        field: 'updatedAt',
        cellRenderer: (data) => {
          return data.value
            ? this.datePipe.transform(
                new Date(data.value),
                'dd/MM/yyyy; h:mm a'
              )
            : '-';
        },
      },

      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.creationDate'
        ),
        field: 'createdAt',
        cellRenderer: (data) => {
          return data.value
            ? this.datePipe.transform(new Date(data.value), 'dd/MM/yyyy')
            : '-';
        }
      }
    ];
  }

  onBtnClick(params) {
    this.router.navigate([ROUTES.ADMIN.QUIZ.NEW + '/' + params.data['id']], {
      relativeTo: this.route.parent,
    });
  }

  private getGridProperties(): GridPropertiesInterface {
    return {
      url: GLOBALS.DATA_URL.SAVE_QUIZ_SETTINGS,
      actions: {
        page: [
          {
            label: this.customTranslateService.getTranslation(
              'admin.quiz.list.addQuizButton'
            ),
            handler: (button) => {
              this.router.navigate([ROUTES.ADMIN.QUIZ.NEW], {
                relativeTo: this.route.parent,
              });
            }
          }
        ]
      }
    };
  }

  private deleteQuiz(params) {
    const dialogRef = this.confirmationDialogService.show({
      data: {
        message: this.customTranslateService.getTranslation(
          'confirmationDialog.deleteQuizConfirmation'
        ),
        buttons: [
          {
            text: this.customTranslateService.getTranslation('general.yes'),
            handler: () => {
              const url = this.placeholderFormatService.stringFormat(
                GLOBALS.DATA_URL.DELETE_QUIZ,
                {
                  '{quizId}': params.data.id,
                }
              );

              this.quizListService.removeQuiz(url).subscribe((response) => {
                this.matSnackBar.open(
                  response['message'],
                  GLOBALS.NOTIFICATIONS.INFO,
                  {
                    duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                    verticalPosition: 'bottom',
                  }
                );

                dialogRef.close();

                this.gridComponent.refreshGrid();
              });
            },
          },
          {
            text: this.customTranslateService.getTranslation('general.no'),
          }
        ]
      }
    });
  }

  private openPreviewQuizDialog() {
    this.dialog.open(PreviewQuizDialogComponent, {
      height: "95vh",
      width: "60vw"
    });
  }
}
