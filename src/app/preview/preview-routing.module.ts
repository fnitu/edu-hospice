import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PreviewComponent } from './preview.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordEnterEmailComponent } from './components/recover-password-enter-email/recover-password-enter-email.component';
import { RecoverOrChangePasswordComponent } from './components/recover-or-change-password/recover-or-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewRoutingModule {
}
