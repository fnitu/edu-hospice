import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomTranslateService } from '../../shared/services/custom-translate/custom-translate.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyTemplateOptions } from '@ngx-formly/core/lib/components/formly.field.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  form = new FormGroup({});
  model = {
    email: 'danut.chindris@test.com',
    password: 'testpassword'
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation('general.email'),
        placeholder: this.customTranslateService.getTranslation('user.login.loginPlaceholder')
      },
      validators: {
        validation: [Validators.required, 'email']
      }

    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation('user.login.password'),
        placeholder: this.customTranslateService.getTranslation('user.login.passwordPlaceholder')
      },
      validators: {
        validation: [Validators.required]
      }
    }
  ];

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private matSnackBar: MatSnackBar,
              private customTranslateService: CustomTranslateService) {
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.loginService.login(email, password).subscribe((response) => {
        this.userService.userDetails = {
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role
        };

        this.authService.accessToken = response.accessToken;

        if (response.role === 'ROLE_ADMIN') {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.router.navigate(['user/dashboard']);
        }
      }, error => {
        if (error.status === 401) {
          this.form.get('password').setValue('');
          this.matSnackBar.open(this.customTranslateService.getTranslation('user.login.invalidEmailOrPassword'));
        }
      });
    }
  }

  public forgotPassword() {
    this.router.navigate(['recover-password-enter-email'], {relativeTo: this.route.parent});
  }

}
