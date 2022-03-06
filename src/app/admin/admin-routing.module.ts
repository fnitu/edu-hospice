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
import { AdminEditInfo } from './components/admin-edit-info/admin-edit-info.component';

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
        path: ROUTES.ADMIN.COURSE.LIST,
        data: {
          breadcrumb: {
            label: 'admin.dashboard.titleCourses',
          },
        },
        children: [
          {
            path: '',
            component: CourseListComponent,
          },
          {
            path: ROUTES.ADMIN.COURSE.NEW,
            component: CourseComponent,
            data: {
              breadcrumb: {
                label: 'admin.dashboard.newCourse',
              },
            },
          },
          {
            path: `${ROUTES.ADMIN.COURSE.NEW}/:courseId`,
            component: CourseComponent,
            data: {
              breadcrumb: {
                label: 'admin.dashboard.courseEdit',
              },
            },
          },
        ],
      },
      {
        path: `${ROUTES.ADMIN.USERS}/:listType`,
        data: {
          breadcrumb: {
            label: 'admin.dashboard.users',
          },
        },
        component: UsersComponent,
      },
      {
        path: ROUTES.ADMIN.QUIZ.LIST,
        data: {
          breadcrumb: {
            label: 'admin.dashboard.quizList',
          },
        },
        children: [
          {
            path: '',
            component: QuizListComponent,
          },
          {
            path: ROUTES.ADMIN.QUIZ.NEW,
            component: NewQuizComponent,
            data: {
              breadcrumb: {
                label: 'admin.dashboard.newQuiz',
              },
            },
          },
          {
            path: `${ROUTES.ADMIN.QUIZ.NEW}/:id`,
            component: NewQuizComponent,
            data: {
              breadcrumb: {
                label: 'admin.dashboard.quizEdit',
              },
            },
          },
        ],
      },
      {
        path: `${ROUTES.ADMIN.PROFILE_EDIT}`,
        component: AdminEditInfo,
        data: {
          breadcrumb: {
            label: 'admin.editInformations.editInfo',
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
