import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // FIXME
    //  replace with server call current user
    role: string = 'ROLE_USER';

    get accessToken(): string {
        return sessionStorage.getItem("token");
    }

    set accessToken(value: string) {
        sessionStorage.setItem("token", value);
    }

    public isAuthenticated(): boolean {
        return !!this.accessToken;
    }
}
