import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-manage-resources-dialog',
  templateUrl: './manage-resources-dialog.component.html',
  styleUrls: ['manage-resources-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageResourcesDialog {
  public title: string;
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Numele Resursei',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'URL',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public content: any) {}

  onResourceDelete() {
    console.log('deleted');
  }

  onSave() {}
}
