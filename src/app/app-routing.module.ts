import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService } from './shared/services/authentication/auth-guard.service';
import { ROUTES } from './shared/core/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.PREVIEW.MAIN_ROUTE,
    pathMatch: 'full',
  },
  {
    path: ROUTES.ADMIN.MAIN_ROUTE,
    canActivate: [AuthGuardService],
    data: {
      isAdmin: true,
      breadcrumb: {
        label: 'topToolbar.tooltips.adminDashboard',
      },
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: ROUTES.PREVIEW.MAIN_ROUTE,
    loadChildren: () =>
      import('./preview/preview.module').then((m) => m.PreviewModule),
  },
  {
    path: ROUTES.USER.MAIN_ROUTE,
    canActivate: [AuthGuardService],
    data: {
      isAdmin: false,
      breadcrumb: {
        label: 'topToolbar.tooltips.userDashboard',
      },
    },
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
