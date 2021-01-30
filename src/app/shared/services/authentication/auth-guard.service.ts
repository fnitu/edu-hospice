import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const authenticated = this.authService.isAuthenticated();

        if (!authenticated) {
            this.router.navigate([`preview/login/${encodeURIComponent(state.url)}`]);
            return false;
        }

        const isAdmin = route.data.isAdmin;
        const role = this.authService.role;
        const canAccess = (role === "ROLE_ADMIN" && isAdmin) || (role === "ROLE_USER" && !isAdmin);
        const defaultRoute = role === "ROLE_ADMIN" ? "admin" : "user";

        if (authenticated && !canAccess) {
            this.router.navigate([defaultRoute])
            return false;

        } else {
            return true;
        }

    }
}
