import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../authentication/auth.service";

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}
