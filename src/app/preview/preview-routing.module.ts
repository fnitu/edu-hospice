import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PreviewComponent } from './preview.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordEnterEmailComponent } from './components/recover-password-enter-email/recover-password-enter-email.component';
import { RecoverOrChangePasswordComponent } from './components/recover-or-change-password/recover-or-change-password.component';
import { ROUTES } from "../shared/core/routes";

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES.PREVIEW.HOME,
        pathMatch: 'full'
      },
      {
        path: ROUTES.PREVIEW.HOME,
        component: HomeComponent,
      },
      {
        path: ROUTES.PREVIEW.LOGIN,
        component: LoginComponent,
      },
      {
        path: `${ROUTES.PREVIEW.LOGIN}/:redirect`,
        component: LoginComponent,
      },
      {
        path: ROUTES.PREVIEW.RECOVER_PASSWORD_ENTER_EMAIL,
        component: RecoverPasswordEnterEmailComponent,
      },
      {
        path: ROUTES.PREVIEW.RECOVER_OR_CHANGE_PASSWORD,
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
