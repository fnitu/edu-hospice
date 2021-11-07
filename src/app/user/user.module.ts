import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './components/course/course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadProfilePictureDialogComponent } from './components/dashboard/upload-profile-picture-dialog/upload-profile-picture-dialog.component';
import { UserEditInfo } from './components/user-edit-info/user-edit-info.component';
import { EditPersonalData } from './components/user-edit-info/edit-personal-data/edit-personal-data.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    CourseComponent,
    UploadProfilePictureDialogComponent,
    UserEditInfo,
    EditPersonalData,
  ],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
