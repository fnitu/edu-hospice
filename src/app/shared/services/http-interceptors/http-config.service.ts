import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from "../authentication/auth.service";
import { LoadingMaskService } from "../loading-mask/loading-mask.service";

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService implements HttpInterceptor {
    private _inProgressCount = 0;

    constructor(private authService: AuthService,
                private loadingMaskService: LoadingMaskService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.accessToken}`
                }
            });
        }

        // display loading mask for requests
        if (!request.headers.has('ignoreLoadingMask')) {

            this._inProgressCount++;

            // display only one mask for multiple requests
            if (this._inProgressCount >= 1) {
                this.loadingMaskService.show();
            }
        }

        return next.handle(request).pipe(
            finalize(() => {

                if (this._inProgressCount > 0) {
                    this._inProgressCount--;
                }

                if (this._inProgressCount === 0) {
                    this.loadingMaskService.hide();
                }
            }),
            catchError((err: any) => {
                return of(err);
            }));
    }
}
