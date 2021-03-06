import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './preview/components/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import TranslationsJson from '../assets/translations.json';
import { LoadingMaskService } from './shared/services/loading-mask/loading-mask.service';
import { AppService } from './app.service';
import { ROUTES } from "./shared/core/routes";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public previewRoute = ROUTES.PREVIEW.MAIN_ROUTE;
    public loginRoute = `${ROUTES.PREVIEW.MAIN_ROUTE}/${ROUTES.PREVIEW.LOGIN}`

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
}
