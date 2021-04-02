import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateCourseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Name',
        required: true,
      },
    },    
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        placeholder: 'description',
      },
    },
    {
      key: 'short_description',
      type: 'textarea',
      templateOptions: {
        label: 'Short description',
        placeholder: 'Short description',
      },
    },
  ];

  submit() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.model));
    }
  }
}
