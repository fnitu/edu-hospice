import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import { CustomTranslateService } from '../../shared/services/custom-translate/custom-translate.service';
import {TooltipService} from '../../shared/services/tooltip/tooltip.service';

@Component({
  selector: 'app-recover-or-change-password',
  templateUrl: './recover-or-change-password.component.html',
  styleUrls: ['./recover-or-change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverOrChangePasswordComponent implements OnInit {

  form = new FormGroup({});
  formModel = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'password',
      type: 'input',
      className: 'password',
      id: 'passwordSet',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation('user.managePassword.password'),
        placeholder: this.customTranslateService.getTranslation('user.managePassword.passwordPlaceholder')
      },
      validators: {
        validation: [Validators.required],
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordSet(control)
        }
      }
    },
    {
      key: 'passwordCheck',
      type: 'input',
      id: 'passwordCheck',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation('user.managePassword.password'),
        placeholder: this.customTranslateService.getTranslation('user.managePassword.passwordPlaceholderConfirmation')
      },
      validators: {
        validation: [Validators.required],
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordCheck(control)
        }
      }
    }
  ];
  private passwordRules = {
    textPassMinLength: 6,
    textPassMaxLength: 10,
    textPassMinNum: 1,
    textPassMaxNum: 5,
    textPassMinSpecChars: 1,
    textPassMaxSpecChars: 5,
    textPassMinCaps: 1
  };
  private numericRegex = /([0-9])/g;
  private specialCharactersRegex = /([^0-9A-Za-z])/g;
  private capitalLettersRegex = /([A-Z])/g;

  private tippyInstancePasswordSet;
  private tippyInstancePasswordCheck;

  constructor(private customTranslateService: CustomTranslateService,
              private tooltipService: TooltipService) { }

  ngOnInit(): void {
  }

  onSubmit() {
  }

  validateInputPasswordSet(control) {
    let valid = true;
    let message = '';
    const element = document.getElementById('passwordSet');

    if (control.value) {
      if (control.value.length < this.passwordRules.textPassMinLength || control.value.length > this.passwordRules.textPassMaxLength) {
        message += `<div>${this.customTranslateService.getTranslation('user.managePassword.length')}</div>`;
        valid = false;
      }

      const matchNumberLength = control.value.match(this.numericRegex) ? control.value.match(this.numericRegex).length : null;
      if (this.passwordRules.textPassMinNum > matchNumberLength || this.passwordRules.textPassMaxNum < matchNumberLength) {
        message += `<div>${this.customTranslateService.getTranslation('user.managePassword.numberOfNumericCharacters')}</div>`;
        valid = false;
      }

      const matchSpecialCharactersLength = control.value.match(this.specialCharactersRegex) ? control.value.match(this.specialCharactersRegex).length : null;
      if (this.passwordRules.textPassMinSpecChars > matchSpecialCharactersLength || this.passwordRules.textPassMaxSpecChars < matchSpecialCharactersLength) {
        message += `<div>${this.customTranslateService.getTranslation('user.managePassword.numberOfSpecialCharacters')}</div>`;
        valid = false;
      }

      const matchCapitalLettersLength = control.value.match(this.capitalLettersRegex) ? control.value.match(this.capitalLettersRegex) : null;
      if (this.passwordRules.textPassMinCaps > matchCapitalLettersLength) {
        message += `<div>${this.customTranslateService.getTranslation('user.managePassword.numberOfCapitalLetters')}</div>`;
        valid = false;
      }
    }

    if (!valid) {
      this.initTooltipTippyInstancePasswordSet(element, message);
      this.tippyInstancePasswordSet.show();
    } else if ( valid && this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.hide();
    }

    return valid;
  }

  private validateInputPasswordCheck(control) {
    let valid = true;
    let message = '';
    const element = document.getElementById('passwordCheck');

    if (control.value) {
      if (control.value !== this.form.controls.password.value) {
        message += `<div>${this.customTranslateService.getTranslation('user.managePassword.passwordsMatch')}</div>`;
        valid = false;
      }
    }

    if (!valid) {
      this.initTooltipTippyInstancePasswordCheck(element, message);
      this.tippyInstancePasswordCheck.show();
    } else if ( valid && this.tippyInstancePasswordCheck) {
      this.tippyInstancePasswordCheck.hide();
    }

    return valid;
  }

  private initTooltipTippyInstancePasswordSet(element, message) {
    if (this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.setContent(message);
    } else {
      this.tippyInstancePasswordSet = this.tooltipService.init(element, {
        content: `<div>${message}</div>`,
        trigger: 'manual'
      });
    }
  }

  private initTooltipTippyInstancePasswordCheck(element, message) {
    if (this.tippyInstancePasswordCheck) {
      this.tippyInstancePasswordCheck.setContent(message);
    } else {
      this.tippyInstancePasswordCheck = this.tooltipService.init(element, {
        content: `<div>${message}</div>`,
        trigger: 'manual'
      });
    }
  }

}
