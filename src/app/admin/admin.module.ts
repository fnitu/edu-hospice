import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './components/users/users.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AdminComponent,
    CourseListComponent,
    DashboardComponent,
    UserListComponent,
    UsersComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
  providers: [DatePipe],
})
export class AdminModule {}
