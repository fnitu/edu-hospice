import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RegisterService } from 'src/app/preview/components/register/register.service';
import { CustomTranslateService } from '../../services/custom-translate/custom-translate.service';
import { TooltipService } from '../../services/tooltip/tooltip.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePassword {
  private passwordRules = {
    textPassMinLength: 6,
    textPassMaxLength: 10,
    textPassMinNum: 1,
    textPassMaxNum: 5,
    textPassMinSpecChars: 1,
    textPassMaxSpecChars: 5,
    textPassMinCaps: 1,
  };
  private numericRegex = /([0-9])/g;
  private specialCharactersRegex = /([^0-9A-Za-z])/g;
  private capitalLettersRegex = /([A-Z])/g;
  private tippyInstancePasswordSet;
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
      validation: [Validators.required],
    },
    {
      key: 'newPassword',
      type: 'input',
      id: 'password',
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
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordSet(control),
        },
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
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordCheck(control),
          message: this.customTranslateService.getTranslation(
            'preview.managePassword.passwordsMatch'
          ),
        },
      },
    },
  ];
  constructor(
    private customTranslateService: CustomTranslateService,
    private registerService: RegisterService,
    private tooltipService: TooltipService
  ) {}

  validateInputPasswordSet(control) {
    let valid = true;
    let message = '';
    const element = document.getElementById('password');

    if (control.value) {
      if (
        control.value.length < this.passwordRules.textPassMinLength ||
        control.value.length > this.passwordRules.textPassMaxLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.length'
        )}</div>`;
        valid = false;
        console.log('lungime');
      }

      const matchNumberLength = control.value.match(this.numericRegex)
        ? control.value.match(this.numericRegex).length
        : null;
      if (
        this.passwordRules.textPassMinNum > matchNumberLength ||
        this.passwordRules.textPassMaxNum < matchNumberLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfNumericCharacters'
        )}</div>`;
        valid = false;
        console.log('numarul de numere');
      }

      const matchSpecialCharactersLength = control.value.match(
        this.specialCharactersRegex
      )
        ? control.value.match(this.specialCharactersRegex).length
        : null;
      if (
        this.passwordRules.textPassMinSpecChars >
          matchSpecialCharactersLength ||
        this.passwordRules.textPassMaxSpecChars < matchSpecialCharactersLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfSpecialCharacters'
        )}</div>`;
        valid = false;
        console.log('caractere speciale');
      }

      const matchCapitalLettersLength = control.value.match(
        this.capitalLettersRegex
      )
        ? control.value.match(this.capitalLettersRegex)
        : null;
      if (this.passwordRules.textPassMinCaps > matchCapitalLettersLength) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfCapitalLetters'
        )}</div>`;
        valid = false;
        console.log('capitalize');
      }
    }

    if (!valid) {
      this.initTooltipTippyInstancePasswordSet(element, message);
      this.tippyInstancePasswordSet.show();
    } else if (valid && this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.hide();
    }

    return valid;
  }

  private initTooltipTippyInstancePasswordSet(element, message) {
    if (this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.setContent(message);
    } else {
      this.tippyInstancePasswordSet = this.tooltipService.init(element, {
        content: `<div>${message}</div>`,
        trigger: 'manual',
      });
    }
  }

  private validateInputPasswordCheck(control) {
    return control.value === this.form.get(['newPassword']).value;
  }

  public onChangePassword() {
    const newPasswordData = {
      oldPassword: this.form.get('oldPassword').value,
      newPassword: this.form.get('newPassword').value,
      confirmNewPassword: this.form.get('confirmNewPassword').value,
    };

    this.registerService
      .setNewPassword(newPasswordData)
      .subscribe((response) => console.log(response));
  }
}
