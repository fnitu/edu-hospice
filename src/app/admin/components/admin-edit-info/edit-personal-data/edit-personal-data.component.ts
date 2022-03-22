import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RegisterService } from 'src/app/preview/components/register/register.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { AdminEditInfoService } from '../admin-edit-info.service';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditPersonalData {
  private user;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        maxLength: 100,
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
      key: 'lastName',
      type: 'input',
      templateOptions: {
        maxLength: 100,
        type: 'text',
        label: this.customTranslateService.getTranslation(
          'admin.editInformations.newSurname'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'admin.editInformations.newSurname'
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
          'admin.editInformations.email'
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

  constructor(
    private customTranslateService: CustomTranslateService,
    private adminEditInfoService: AdminEditInfoService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.adminEditInfoService.getAdminPersonalData().subscribe((user) => {
      this.form.get('firstName').setValue(user['firstName']);
      this.form.get('lastName').setValue(user['lastName']);
      this.form.get('email').setValue(user['email']);
      this.user = user;
    });
  }

  public onEditAdminInfo() {
    const userInfo = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
    };

    this.registerService
      .editAdminData(userInfo)
      .subscribe((response) => console.log(response));
  }
}
