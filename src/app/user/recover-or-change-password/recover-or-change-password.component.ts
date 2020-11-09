import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {CustomTranslateService} from '../../shared/services/custom-translate/custom-translate.service';
import {TooltipService} from '../../shared/services/tooltip/tooltip.service';
import {LoginService} from '../login/login.service';
import {UserService} from '../user.service';
import {AuthService} from '../../shared/services/authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
          expression: (control) => this.validateInputPasswordCheck(control),
          message: this.customTranslateService.getTranslation('user.managePassword.passwordsMatch')
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

  constructor(private customTranslateService: CustomTranslateService,
              private tooltipService: TooltipService,
              private loginService: LoginService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    console.log(history.state.data);
  }

  onSubmit() {
    if (this.form.valid) {
      const email = 'danut.chindris@test.com';
      const password = 'testpassword';

      this.loginService.login(email, password).subscribe((response) => {
        this.userService.userDetails = {
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role
        };

        this.authService.accessToken = response.accessToken;

        this.router.navigate(['user/dashboard']);
      }, error => {
        if (error.status === 401) {
          this.form.get('password').setValue('');
          this.matSnackBar.open(this.customTranslateService.getTranslation('user.login.invalidEmailOrPassword'));
        }
      });
    }
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
