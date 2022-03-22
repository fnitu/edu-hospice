import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { CustomTranslateService } from '../../../shared/services/custom-translate/custom-translate.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ROUTES } from '../../../shared/core/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  form = new FormGroup({});
  model = {
    email: 'student.user@test.com',
    password: 'aaAA11!!',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation('general.email'),
        placeholder: this.customTranslateService.getTranslation(
          'preview.login.loginPlaceholder'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required, 'email'],
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.login.password'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.login.passwordPlaceholder'
        ),
        appearance: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private customTranslateService: CustomTranslateService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.loginService.login(email, password).subscribe(
        (response) => {
          this.loginService.userDetails = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role,
            memberSince: response.memberSince,
            totalFinishedCourses: response.totalFinishedCourses,
            totalHoursFinishedCourses: response.totalHoursFinishedCourses,
          };

          this.authService.accessToken = response.accessToken;

          const params = this.route.snapshot.params.redirect
            ? decodeURIComponent(this.route.snapshot.params.redirect)
            : null;

          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(
              params
                ? [params]
                : [`${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.DASHBOARD}`]
            );
          } else {
            this.router.navigate(
              params
                ? [params]
                : [`${ROUTES.USER.MAIN_ROUTE}/${ROUTES.USER.DASHBOARD}`]
            );
          }
        },
        (error) => {
          // message notification is displayed by the http interceptor
          if (error.status === 401) {
            this.form.get('password').setValue('');
          }
        }
      );
    }
  }

  public forgotPassword() {
    this.router.navigate([ROUTES.PREVIEW.RECOVER_PASSWORD_ENTER_EMAIL], {
      relativeTo: this.route.parent,
    });
  }
}
