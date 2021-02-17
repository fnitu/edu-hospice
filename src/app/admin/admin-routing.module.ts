import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CourseListComponent } from "./components/course-list/course-list.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from "./components/users/users.component";
import { ROUTES } from "../shared/core/routes";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES.ADMIN.DASHBOARD,
        pathMatch: 'full'
      },
      {
        path: ROUTES.ADMIN.DASHBOARD,
        component: DashboardComponent,
      },
      {
        path: ROUTES.ADMIN.COURSE_LIST,
        component: CourseListComponent
      },
      {
        path: ROUTES.ADMIN.USERS,
        component: UsersComponent
      },
      {
        path: `${ROUTES.ADMIN.USERS}/:listType`,
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
