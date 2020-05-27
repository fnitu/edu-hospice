import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {CourseComponent} from './course/course.component';
import {DashboardComponent} from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    DashboardComponent,
    CourseComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
