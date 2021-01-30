import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService } from './shared/services/authentication/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'preview',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        canActivate: [AuthGuardService],
        data: {
            isAdmin: true
        },
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'preview',
        loadChildren: () => import('./preview/preview.module').then(m => m.PreviewModule)},
    {
        path: 'user',
        canActivate: [AuthGuardService],
        data: {
            isAdmin: false
        },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
