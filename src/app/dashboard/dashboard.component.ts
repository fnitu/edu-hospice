import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../login/login.service';
import {User} from '../common/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
  }

  public goToCourse() {
    this.router.navigate(['course']);
  }

}
