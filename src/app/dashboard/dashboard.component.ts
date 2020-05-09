import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../login/login.service';
import {User} from '../common/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
  }

}
