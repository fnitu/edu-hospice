import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './user/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from "./shared/services/authentication/auth.service";
import { UserService } from "./user/user.service";
import {TranslateService} from '@ngx-translate/core';
import TranslationsJson from '../assets/translations.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(private loginService: LoginService,
                private router: Router,
                public authService: AuthService,
                private userService: UserService, private translateService: TranslateService) {
      //init translations
      translateService.setTranslation("en", TranslationsJson);
      translateService.setDefaultLang("en");
    }

    ngOnInit(): void {
    }

    public goToHome() {
        this.router.navigate(['preview']);
    }

    public goToDashboard() {
        this.router.navigate(['user/dashboard']);
    }

    public logout() {
        this.userService.userDetails = null;

        this.authService.accessToken = "";

        this.router.navigate(['preview']);
    }

    public getUserDetails() {
      this.loginService.getUserDetails().subscribe(response=> {
        console.log(response);
      })
    }

}
