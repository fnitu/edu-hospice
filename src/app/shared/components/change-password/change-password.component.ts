import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomTranslateService } from '../../services/custom-translate/custom-translate.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePassword {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'oldPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.managePassword.oldPassword'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.managePassword.oldPassword'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'newPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.managePassword.newPassword'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.managePassword.newPassword'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'confirmNewPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.managePassword.confirmNewPassword'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.managePassword.confirmNewPassword'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];
  constructor(private customTranslateService: CustomTranslateService) {}
}
