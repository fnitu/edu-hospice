import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GridPropertiesInterface } from 'src/app/shared/components/grid/grid-properties.interface';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';

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
          'admin.quiz.list.quizName'
        ),
        field: 'quizName',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.quizStatus'
        ),
        field: 'quizStatus',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.numberOfQuestions'
        ),
        field: 'numberOfAssignedQuestions',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.lastUpdate'
        ),
        field: 'lastUpdate',
        cellRenderer: (data) => {
          return data.value
            ? this.datePipe.transform(new Date(data.value), 'dd/MM/yyyy')
            : '-';
        },
      },

      {
        headerName: this.customTranslateService.getTranslation(
          'admin.quiz.list.creationDate'
        ),
        field: 'creationDate',
        cellRenderer: (data) => {
          return data.value
            ? this.datePipe.transform(new Date(data.value), 'dd/MM/yyyy')
            : '-';
        },
      },
      {
        headerName: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          label: 'Edit',
        },
      },
    ];
  }

  onBtnClick(e) {
    this.router.navigate(['admin', 'new-quiz', `${e.rowData['id']}`]);
  }

  private getGridProperties(): GridPropertiesInterface {
    return {
      url: 'assets/json/quizList.json',
      actions: {
        page: [
          {
            label: 'New Quiz',
            handler: (button) => {
              this.onNewQuiz();
            }
          }
        ]
      },
    };
  }

  public onNewQuiz() {
    this.router.navigate(['admin', 'new-quiz']);
  }
}
