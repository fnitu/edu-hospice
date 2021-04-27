import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { GridPropertiesInterface } from '../../../shared/components/grid/grid-properties.interface';
import { ROUTES } from '../../../shared/core/routes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit {
  public gridProperties: GridPropertiesInterface;
  public gridColumns;

  constructor(
    private customTranslateService: CustomTranslateService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gridColumns = this.getGridColumns();
    this.gridProperties = this.getGridProperties();
  }

  private getGridColumns() {
    return [
      {
        headerName: this.customTranslateService.getTranslation(
          'general.actions'
        ),
        field: 'actions',
        cellRenderer: 'rowActionsCellRenderer',
        maxWidth: 90,
        minWidth: 90,
        cellRendererParams: {
          actions: [
            {
              label: this.customTranslateService.getTranslation(
                'general.edit'
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
          'admin.courses.courseName'
        ),
        field: 'name',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.startDate'
        ),
        field: 'startDate',
        cellRenderer: (data) => {
          return data.value
            ? this.datePipe.transform(new Date(data.value), 'dd/MM/yyyy')
            : '-';
        },
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.totalRegisteredUsers'
        ),
        field: 'totalRegisteredUsers',
      },
    ];
  }

  private getGridProperties(): GridPropertiesInterface {
    return {
      url: GLOBALS.DATA_URL.ADMIN_COURSES,
      actions: {
        page: [
          {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.addNewCourse'
            ),
            handler: () => {
              this.router.navigate([ROUTES.ADMIN.COURSE.CREATE], {
                relativeTo: this.route.parent,
              });
            },
          },
        ],
      },
    };
  }

  onBtnClick(params) {
      const courseId = 11111;
      this.router.navigate([ROUTES.ADMIN.COURSE.CREATE_CONTENT, courseId], {
        relativeTo: this.route.parent,
      });
  }


}
