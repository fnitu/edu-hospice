import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { GridPropertiesInterface } from '../../../shared/components/grid/grid-properties.interface';
import { ROUTES } from '../../../shared/core/routes';
import { Router, ActivatedRoute } from '@angular/router';
import {PlaceholderFormatService} from '../../../shared/services/format/placeholder-format.service';
import {CourseListService} from './course-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmationDialogService} from '../../../shared/components/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit {

  @ViewChild('gridComponent') gridComponent;

  public gridProperties: GridPropertiesInterface;
  public gridColumns;

  private readonly STATUS = {
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
    CLOSED: 'closed'
  };

  constructor(private customTranslateService: CustomTranslateService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router,
              private placeholderFormatService: PlaceholderFormatService,
              private courseListService: CourseListService,
              private confirmationDialogService: ConfirmationDialogService,
              private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
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
        maxWidth: 120,
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
              handler: (params) => this.deleteRowActionHandler(params)
            }
          ],
        },
        sortable: false,
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.courseName'
        ),
        cellRenderer: 'rowActionsCellRenderer',
        maxWidth: 350,
        minWidth: 350,
        cellRendererParams: {
          actions: [
            {
              handler: (params) => this.onBtnClick(params),
            },
          ],
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        cellRenderer: (data) => {
          let status = '';
          let cssClass = '';

          switch (data.value) {
            case this.STATUS.UNPUBLISHED :
              status = this.customTranslateService.getTranslation('admin.courses.status.unpublished');
              cssClass = 'unpublished';
              break;
            case this.STATUS.PUBLISHED :
              status = this.customTranslateService.getTranslation('admin.courses.status.published');
              cssClass = 'published';
              break;
            case this.STATUS.CLOSED:
              status = this.customTranslateService.getTranslation('admin.courses.status.closed');
              cssClass = 'closed';
              break;
          }

          return `<div class="${cssClass}">${status}</div>`;
        }
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
    const courseId = params.data.id;

    this.router.navigate([ROUTES.ADMIN.COURSE.EDIT_COURSE, courseId], {
      relativeTo: this.route.parent,
    });
  }

  private deleteRowActionHandler(params) {
    const dialogRef = this.confirmationDialogService.show({
      data: {
        message: this.customTranslateService.getTranslation('confirmationDialog.deleteCourseConfirmation'),
        buttons: [
          {
            text: this.customTranslateService.getTranslation('general.yes'),
            handler: () => {
              const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.DELETE_COURSE,
                {
                  '{courseId}': params.data.id,
                }
              );

              this.courseListService.deleteCourse(url).subscribe((response) => {
                this.matSnackBar.open(response.message, GLOBALS.NOTIFICATIONS.INFO, {
                  duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                  verticalPosition: 'bottom',
                });

                dialogRef.close();

                this.gridComponent.refreshGrid();
              });
            }
          },
          {
            text: this.customTranslateService.getTranslation('general.no')
          }
        ]
      }
    });
  }
}
