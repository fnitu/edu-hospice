import { NgModule } from '@angular/core';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverOrChangePasswordComponent } from './components/recover-or-change-password/recover-or-change-password.component';
import { RecoverPasswordEnterEmailComponent } from './components/recover-password-enter-email/recover-password-enter-email.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    PreviewComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecoverOrChangePasswordComponent,
    RecoverPasswordEnterEmailComponent,
  ],
  imports: [SharedModule, PreviewRoutingModule],
})
export class PreviewModule {}
