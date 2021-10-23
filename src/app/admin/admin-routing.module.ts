import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ROUTES } from '../shared/core/routes';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CourseComponent } from './components/course/course.component';
import { RegisterComponent } from '../preview/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES.ADMIN.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: ROUTES.ADMIN.DASHBOARD,
        component: DashboardComponent,
      },
      {
        path: ROUTES.ADMIN.COURSE_LIST,
        component: CourseListComponent,
      },
      {
        path: ROUTES.ADMIN.COURSE.EDIT_COURSE,
        component: CourseComponent,
      },
      {
        path: `${ROUTES.ADMIN.COURSE.EDIT_COURSE}/:courseId`,
        component: CourseComponent,
      },
      {
        path: `${ROUTES.ADMIN.USERS}/:listType`,
        component: UsersComponent,
      },
      {
        path: ROUTES.ADMIN.QUIZ.LIST,
        children: [
          {
            path: "",
            component: QuizListComponent
          },
          {
            path: ROUTES.ADMIN.QUIZ.NEW,
            component: NewQuizComponent,
          },
          {
            path: `${ROUTES.ADMIN.QUIZ.NEW}/:id`,
            component: NewQuizComponent,
          }
        ]
      },
      {
        path: `${ROUTES.ADMIN.PROFILE_EDIT}`,
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
