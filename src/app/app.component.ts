import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './common/login.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'edu-hospice';

  public isLoggedIn: boolean;

  subscriptionUserHasLoggedIn: Subscription;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptionUserHasLoggedIn = this.loginService.userHasLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  public goToHome() {
    this.router.navigate(['home']);
  }

  public goToDashboard() {
    this.router.navigate(['dashboard', this.loginService.accessToken]);
  }

  public logout() {
    this.loginService.user = null;
    this.loginService.accessToken = undefined;
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscriptionUserHasLoggedIn.unsubscribe();
  }
}
