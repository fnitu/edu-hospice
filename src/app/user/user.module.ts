import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {CourseComponent} from './course/course.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { RecoverOrChangePasswordComponent } from './recover-or-change-password/recover-or-change-password.component';
import { RecoverPasswordEnterEmailComponent } from './recover-password-enter-email/recover-password-enter-email.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpConfigService} from '../shared/services/http-interceptors/http-config.service';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {GlobalMatFormFieldConfig} from '../shared/constants/global-mat-form-field-config';
import {FORMLY_CONFIG} from '@ngx-formly/core';
import {formlyValidationConfig} from '../shared/components/formly/formly-validation-config';
import {CustomTranslateService} from '../shared/services/custom-translate/custom-translate.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {GlobalMatSnackBarConfig} from '../shared/constants/global-mat-snack-bar-config';

import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    DashboardComponent,
    CourseComponent,
    RecoverOrChangePasswordComponent,
    RecoverPasswordEnterEmailComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
