import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditPersonalData {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'userName',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: this.customTranslateService.getTranslation(
          'admin.editInformations.newUsername'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.editInformations.name'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: this.customTranslateService.getTranslation(
          'admin.editInformations.newEmail'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.editInformations.email'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required, Validators.email],
      },
    },
  ];

  constructor(private customTranslateService: CustomTranslateService) {}
}
