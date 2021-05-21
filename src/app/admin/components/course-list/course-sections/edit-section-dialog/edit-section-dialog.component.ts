import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { GLOBALS } from 'src/app/shared/core/globals';
import { CourseSectionService } from '../course-section.service';

@Component({
  selector: 'app-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSectionDialogComponent {
  form = new FormGroup({});
  model = {
    name: this.data.name,
    index: this.data.index,
    visibility: true,
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Numele sectiunii',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'index',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Index',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'visibility',
      type: 'toggle',
      templateOptions: {
        label: 'Vizibil',
      },
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  onSectionEdit() {
    console.log('a');
  }
}
