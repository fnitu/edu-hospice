import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomTranslateService } from '../../../shared/services/custom-translate/custom-translate.service';
import { TooltipService } from '../../../shared/services/tooltip/tooltip.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {GLOBALS} from '../../../shared/core/globals';
import {RecoverOrChangePasswordService} from './recover-or-change-password.service';

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
        label: this.customTranslateService.getTranslation('preview.managePassword.password'),
        placeholder: this.customTranslateService.getTranslation('preview.managePassword.passwordPlaceholder')
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
        label: this.customTranslateService.getTranslation('preview.managePassword.password'),
        placeholder: this.customTranslateService.getTranslation('preview.managePassword.passwordPlaceholderConfirmation')
      },
      validators: {
        validation: [Validators.required],
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordCheck(control),
          message: this.customTranslateService.getTranslation('preview.managePassword.passwordsMatch')
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
  private token: string;

  constructor(private customTranslateService: CustomTranslateService,
              private tooltipService: TooltipService,
              private loginService: LoginService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private recoverOrChangePasswordService: RecoverOrChangePasswordService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const password = this.form.get('password').value;
      const url = GLOBALS.dataURL.resetPassword;
      const bodyParams = {
        password: password,
        token: this.token
      };

      this.recoverOrChangePasswordService.resetPassword(url, bodyParams).subscribe((response) => {
        let action = '';

        if (response.success) {
          action = GLOBALS.constants.NOTIFICATIONS.INFO;
        } else {
          action = GLOBALS.constants.NOTIFICATIONS.ERROR;
        }

        this.matSnackBar.open(response.message, action, {
          duration: GLOBALS.constants.NOTIFICATIONS.durationInSeconds * 1000,
          verticalPosition: 'top'
        });

      });
    }
  }

  validateInputPasswordSet(control) {
    let valid = true;
    let message = '';
    const element = document.getElementById('passwordSet');

    if (control.value) {
      if (control.value.length < this.passwordRules.textPassMinLength || control.value.length > this.passwordRules.textPassMaxLength) {
        message += `<div>${this.customTranslateService.getTranslation('preview.managePassword.length')}</div>`;
        valid = false;
      }

      const matchNumberLength = control.value.match(this.numericRegex) ? control.value.match(this.numericRegex).length : null;
      if (this.passwordRules.textPassMinNum > matchNumberLength || this.passwordRules.textPassMaxNum < matchNumberLength) {
        message += `<div>${this.customTranslateService.getTranslation('preview.managePassword.numberOfNumericCharacters')}</div>`;
        valid = false;
      }

      const matchSpecialCharactersLength = control.value.match(this.specialCharactersRegex) ? control.value.match(this.specialCharactersRegex).length : null;
      if (this.passwordRules.textPassMinSpecChars > matchSpecialCharactersLength || this.passwordRules.textPassMaxSpecChars < matchSpecialCharactersLength) {
        message += `<div>${this.customTranslateService.getTranslation('preview.managePassword.numberOfSpecialCharacters')}</div>`;
        valid = false;
      }

      const matchCapitalLettersLength = control.value.match(this.capitalLettersRegex) ? control.value.match(this.capitalLettersRegex) : null;
      if (this.passwordRules.textPassMinCaps > matchCapitalLettersLength) {
        message += `<div>${this.customTranslateService.getTranslation('preview.managePassword.numberOfCapitalLetters')}</div>`;
        valid = false;
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

  private validateInputPasswordCheck(control) {
    return control.value === this.form.get('password').value;
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

}
