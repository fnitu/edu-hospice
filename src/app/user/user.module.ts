import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './components/course/course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadProfilePictureDialogComponent } from './components/dashboard/upload-profile-picture-dialog/upload-profile-picture-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    CourseComponent,
    UploadProfilePictureDialogComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
