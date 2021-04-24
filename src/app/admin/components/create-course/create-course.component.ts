import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { GLOBALS } from 'src/app/shared/core/globals';
import {
  CourseRole,
  CourseState,
  CourseType,
  CreateCourse,
  Currency,
} from 'src/app/shared/interfaces/createCourse';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { CreateCourseService } from '../create-course/create-course.service';
import {ROUTES} from '../../../shared/core/routes';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateCourseComponent implements OnInit {
  constructor(
    private customTranslateService: CustomTranslateService,
    private createCourseService: CreateCourseService,
    private matSnackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({});
  model: CreateCourse = {} as CreateCourse;
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: true,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.name'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.name'
        ),
        required: true,
      },
    },
    {
      key: 'shortDescription',
      type: 'textarea',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.shortDescription'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.shortDescription'
        ),
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.description'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.description'
        ),
        required: true,
      },
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'authors',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.author'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.author'
            ),
          },
        },
        {
          className: 'flex-1',
          key: 'image',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.image'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.url'
            ),
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'price',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.price'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.price'
            ),
          },
        },
        {
          className: 'flex-1',
          key: 'currency',
          type: 'select',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.currency'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.currency'
            ),
            options: [
              {
                value: Currency.EUR,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.eur'
                ),
              },
              {
                value: Currency.RON,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.ron'
                ),
              },
            ],
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'courseRole',
          type: 'select',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.role'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.role'
            ),
            options: [
              {
                value: CourseRole.MEDICAL,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.medicalPersonnel'
                ),
              },
              {
                value: CourseRole.MULTI_DISCIPLINARY,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.multiDisciplinaryPersonnel'
                ),
              },
            ],
            required: true,
          },
        },
        {
          className: 'flex-1',
          key: 'courseType',
          type: 'select',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.courseType'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.courseType'
            ),
            options: [
              {
                value: CourseType.ALWAYS_ON,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.alwaysOn'
                ),
              },
              {
                value: CourseType.WITH_LIVE_SESSIONS,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.liveSessions'
                ),
              },
            ],
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'startDate',
          type: 'datepicker',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.startDate'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.startDate'
            ),
          },
        },
        {
          className: 'flex-1',
          key: 'endDate',
          type: 'datepicker',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.endDate'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.endDate'
            ),
          },
        },
      ],
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'courseState',
          type: 'select',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.status'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.status'
            ),
            options: [
              {
                value: CourseState.UNPUBLISHED,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.unpublished'
                ),
              },
              {
                value: CourseState.PUBLISHED,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.published'
                ),
              },
              {
                value: CourseState.CLOSED,
                label: this.customTranslateService.getTranslation(
                  'admin.createCourse.closed'
                ),
              },
            ],
            required: true,
          },
        },
        {
          className: 'flex-1',
          key: 'hours',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.hours'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.hours'
            ),
            required: true,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'accessDays',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.accessDays'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.accessDays'
            ),
          },
        },
        {
          className: 'flex-1',
          key: 'credits',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'admin.createCourse.credits'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'admin.createCourse.credits'
            ),
            required: true,
          },
        },
      ],
    },
  ];

  submit() {
    const url = GLOBALS.DATA_URL.ADMIN_COURSES;
    this.createCourseService
      .createCourse(url, this.model)
      .subscribe((response) => {
        if (response?.success) {
          this.matSnackBar.openFromComponent(SnackBarComponent, {
            verticalPosition: 'top',
            data: {
              content: response.message,
              type: GLOBALS.NOTIFICATIONS.INFO,
            },
          });
        }
      });
    this.options.resetModel();
    setTimeout(() => {
      this.location.back();
    }, 5000);
  }


  public editCourse() {
    const courseId = 11111;

    this.router.navigate([ROUTES.ADMIN.COURSE.CREATE_CONTENT, courseId], {relativeTo: this.route.parent});
  }
}
