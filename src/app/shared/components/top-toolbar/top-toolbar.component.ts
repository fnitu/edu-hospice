import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/preview/components/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import TranslationsJson from 'src/assets/translations.json';
import { LoadingMaskService } from 'src/app/shared/services/loading-mask/loading-mask.service';
import { AppService } from 'src/app/app.service';
import { ROUTES } from '../../../shared/core/routes';
import { GLOBALS } from 'src/app/shared/core/globals';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopToolbarComponent implements OnInit {
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
    this.translateService.setTranslation('en', TranslationsJson);
    this.translateService.setDefaultLang('en');
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

  public checkUserRole(userRole: string): Observable<any>{
    let checkUser$: Observable<any>;
    checkUser$ = this.authService.currentUserResponse.pipe(map((data => { return data.role === userRole})));
    return checkUser$;
  }
}
