import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { LoadingMaskService } from '../loading-mask/loading-mask.service';
import { GLOBALS } from '../../core/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from "../../components/snack-bar/snack-bar.component";

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService implements HttpInterceptor {
    private _inProgressCount = 0;

    constructor(private authService: AuthService,
                private loadingMaskService: LoadingMaskService,
                private matSnackBar: MatSnackBar) {
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
            catchError((err: any) => this.handleError(err))
        );
    }


    private handleError(error) {
        const errorMessage = `<div>Error Code: ${error.status}</div>
                              <div>Message: ${error.error.message}</div>`;

        this.matSnackBar.openFromComponent(SnackBarComponent, {
            duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
            verticalPosition: 'top',
            data: {
                contentAsHTML: errorMessage,
                type: GLOBALS.NOTIFICATIONS.ERROR
            }
        });

        return throwError(error);

    }
}
