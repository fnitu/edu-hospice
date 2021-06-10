import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CourseRole, CourseState, CourseType, CreateCourse, Currency} from '../../../../shared/interfaces/createCourse';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {GLOBALS} from '../../../../shared/core/globals';
import {CustomTranslateService} from '../../../../shared/services/custom-translate/custom-translate.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceholderFormatService} from '../../../../shared/services/format/placeholder-format.service';
import {CourseInfoService} from './course-info.service';
import {ROUTES} from '../../../../shared/core/routes';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseInfoComponent implements OnInit {

  @Output() cardInfoHasBeenSubmitted = new EventEmitter();

  @Input() courseId;

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
      type: 'inputField',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.name'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.name'
        ),
        maxLength: 150,
        required: true,
      },
    },
    {
      key: 'shortDescription',
      type: 'textareafield',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.shortDescription'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.shortDescription'
        ),
        rows: 3,
        maxLength: 500,
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textareafield',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.description'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.description'
        ),
        rows: 5,
        maxLength: 2000,
        required: true,
      },
    },
    {
      key: 'authors',
      type: 'textareafield',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'admin.createCourse.author'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.createCourse.author'
        ),
        rows: 3,
        maxLength: 500,
      },
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
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
            type: 'number',
            min: 0,
            step: 0.01,
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
            type: 'number',
            min: 0,
            max: 1000,
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
            type: 'number',
            min: 0,
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
            type: 'number',
            min: 0,
            max: 100,
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

  constructor(private customTranslateService: CustomTranslateService,
              private courseInfoService: CourseInfoService,
              private matSnackBar: MatSnackBar,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private placeholderFormatService: PlaceholderFormatService) {
  }

  ngOnInit(): void {
    if (!!this.courseId) {
      this.getCourseInfo();
    }
  }

  private getCourseInfo() {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_ADMIN_COURSE_INFO,
      {
        '{id}': this.courseId,
      }
    );

    this.courseInfoService.getCourseInfo(url).subscribe((response) => {
      this.updateFormlyInfo(response);
    });
  }

  private updateFormlyInfo(response) {
    this.form.get('accessDays').setValue(response.accessDays);
    this.form.get('authors').setValue(response.authors);
    this.form.get('courseRole').setValue(response.courseRole);
    this.form.get('courseState').setValue(response.courseState);
    this.form.get('courseType').setValue(response.courseType);
    this.form.get('credits').setValue(response.credits);
    this.form.get('currency').setValue(response.currency);
    this.form.get('description').setValue(response.description);
    this.form.get('endDate').setValue(response.endDate);
    this.form.get('hours').setValue(response.hours);
    this.form.get('image').setValue(response.image);
    this.form.get('name').setValue(response.name);
    this.form.get('price').setValue(response.price);
    this.form.get('image').setValue(response.image);
    this.form.get('shortDescription').setValue(response.shortDescription);
    this.form.get('startDate').setValue(response.startDate);
  }

  submit() {

    // condition needed in ore prevent making post when you are in another course
    if (!this.courseId) {
      const url = GLOBALS.DATA_URL.ADMIN_COURSES;
      this.courseInfoService.createCourse(url, this.model).subscribe((response) => {
        //FIXME response need to have a success parameter

        // if (response?.success) {
        if (!!response?.id) {
          this.updateRouteUrl(response.id);

          this.cardInfoHasBeenSubmitted.emit(response);
        }
      });
    }
    // this.options.resetModel();
  }

  private updateRouteUrl(id) {
    let url = this.router.url;

    const regex = /\/course-list\/course.*$/;

    url = url.replace(regex, `/course-list/course/${id}`);

    // https://stackoverflow.com/questions/35618463/change-route-params-without-reloading-in-angular-2
    this.location.go(url);
  }

  public deleteCourse() {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.DELETE_COURSE,
      {
        '{courseId}': this.courseId,
      }
    );

    this.courseInfoService.deleteCourse(url).subscribe((response) => {

      this.matSnackBar.open(response.message, GLOBALS.NOTIFICATIONS.INFO, {
        duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
        verticalPosition: 'bottom',
      });

      if (response.success) {
        this.options.resetModel();

        setTimeout(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([ROUTES.ADMIN.COURSE.CREATE], {
            relativeTo: this.route.parent,
          });
        }, 2000);
      }
    });
  }
}
