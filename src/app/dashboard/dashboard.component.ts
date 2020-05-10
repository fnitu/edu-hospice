import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../login/login.service';
import {User} from '../common/user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
    const token = this.route.snapshot.paramMap.get('token');
    if (!this.user && token) {
      this.loginService.getUserDetails(token).subscribe((response: User) => {
        this.loginService.user = response;
        this.user = this.loginService.user;
      });
    }
  }

  public goToCourse() {
    this.router.navigate(['course']);
  }

}
