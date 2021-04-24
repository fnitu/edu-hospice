import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GridPropertiesInterface } from 'src/app/shared/components/grid/grid-properties.interface';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { ROUTES } from '../../../shared/core/routes';
import { GLOBALS } from 'src/app/shared/core/globals';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizListComponent implements OnInit {
  public gridProperties: GridPropertiesInterface;
  public gridColumns: any[];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private customTranslateService: CustomTranslateService
  ) {}

  ngOnInit() {
    this.gridColumns = this.getGridColumns();
    this.gridProperties = this.getGridProperties();
  }

  private getGridColumns() {
    return [
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.users.userList.columns.actions'
        ),
        field: 'actions',
        cellRenderer: 'rowActionsCellRenderer',
        maxWidth: 90,
        minWidth: 90,
        cellRendererParams: {
          actions: [
            {
              label: this.customTranslateService.getTranslation(
                'admin.quiz.list.edit'
              ),
              icon: 'edit',
              handler: (params) => this.onBtnClick(params),
            },
          ],
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
        },
      },
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
            },
          },
        ],
      },
    };
  }
}
