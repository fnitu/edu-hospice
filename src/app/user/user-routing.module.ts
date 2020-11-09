import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { UserComponent } from './user.component';
import {RecoverOrChangePasswordComponent} from './recover-or-change-password/recover-or-change-password.component';
import {RecoverPasswordEnterEmailComponent} from './recover-password-enter-email/recover-password-enter-email.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'recover-password-enter-email',
                component: RecoverPasswordEnterEmailComponent,
            },
            {
                path: 'recover-or-change-password',
                component: RecoverOrChangePasswordComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'course/course/:courseId',
                component: CourseComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
