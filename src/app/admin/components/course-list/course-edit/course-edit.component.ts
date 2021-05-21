import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { GLOBALS } from 'src/app/shared/core/globals';

import { Router, ActivatedRoute } from '@angular/router';
import {
  CreateCourse,
  Currency,
  CourseRole,
  CourseType,
  CourseState,
} from 'src/app/shared/interfaces/createCourse';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseEditComponent implements OnInit {
  constructor(
    private customTranslateService: CustomTranslateService,
    private matSnackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  public selected = new FormControl(0);

  public tabChange() {
    this.selected.setValue(this.selected.value + 1);
  }

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
}
