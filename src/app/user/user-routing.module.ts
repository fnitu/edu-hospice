import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseComponent } from './components/course/course.component';
import { UserComponent } from './user.component';
import { ROUTES } from '../shared/core/routes';
import { UserEditInfo } from './components/user-edit-info/user-edit-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES.USER.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: ROUTES.USER.DASHBOARD,
        component: DashboardComponent,
      },
      {
        path: `${ROUTES.USER.COURSE}/:courseId`,
        component: CourseComponent,
      },
      {
        path: `${ROUTES.USER.EDIT_USER_INFO}`,
        component: UserEditInfo,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
