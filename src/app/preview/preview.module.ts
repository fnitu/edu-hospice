import { NgModule } from '@angular/core';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverOrChangePasswordComponent } from './components/recover-or-change-password/recover-or-change-password.component';
import { RecoverPasswordEnterEmailComponent } from './components/recover-password-enter-email/recover-password-enter-email.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeCardDialogComponent } from './components/dialog-home-card/home-card-dialog/home-card-dialog.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PreviewComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecoverOrChangePasswordComponent,
    RecoverPasswordEnterEmailComponent,
    HomeCardDialogComponent,
    ProgressSpinnerComponent,
  ],
  imports: [SharedModule, PreviewRoutingModule, MatProgressSpinnerModule],
  exports: [MatProgressSpinnerModule],
})
export class PreviewModule {}
