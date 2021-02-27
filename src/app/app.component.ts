import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './preview/components/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import TranslationsJson from '../assets/translations.json';
import { LoadingMaskService } from './shared/services/loading-mask/loading-mask.service';
import { AppService } from './app.service';
import { ROUTES } from "./shared/core/routes";
import { GLOBALS } from './shared/core/globals';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { TopToolbarComponent } from './shared/components/top-toolbar/top-toolbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public previewRoute = ROUTES.PREVIEW.MAIN_ROUTE;
    public loginRoute = `${ROUTES.PREVIEW.MAIN_ROUTE}/${ROUTES.PREVIEW.LOGIN}`;
    public readonly GLOBALS = GLOBALS;

    constructor(private loginService: LoginService,
                private router: Router,
                public authService: AuthService,
                private translateService: TranslateService,
                private loadingMaskService: LoadingMaskService,
                private appService: AppService) {

        // init translations
        translateService.setTranslation('en', TranslationsJson);
        translateService.setDefaultLang('en');
    }

    ngOnInit(): void {
       
    }

    ngAfterViewInit() {
        this.loadingMaskService.init();
    }


    public goToHome() {
        this.router.navigate([ROUTES.PREVIEW.MAIN_ROUTE]);
    }

    public goToDashboard() {
        this.router.navigate([`${ROUTES.USER.MAIN_ROUTE}/${ROUTES.USER.DASHBOARD}`]);
    }

    public logout() {
        this.appService.executeLogout().subscribe(
            (response) => {
                if (response.success) {
                    this.loginService.userDetails = null;
                    this.authService.currentUserResponse = null;

                    this.authService.accessToken = '';

                    this.router.navigate([ROUTES.PREVIEW.MAIN_ROUTE]);
                }
            }
        );
    }

    public checkUserRole(userRole: string):  Observable<any>{
        let checkUser$: Observable<any>;
        checkUser$ = this.authService.currentUserResponse.pipe(map((data => { return data.role === userRole })));
        return checkUser$;
    }

}
// export class AppComponent {

// }
