import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../login/login.service';
import {User} from '../common/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../common/course';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public user: User;

  public tabList = ['In desfasurare', 'Recomandat', 'Certificate'];
  public courseList: Array<Course> = new Array<Course>();

  constructor(private loginService: LoginService, private dashboardService: DashboardService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
    const token = this.route.snapshot.paramMap.get('token');
    if (!this.user && token) {
      this.loginService.getUserDetails(token).subscribe((response: User) => {
        this.loginService.user = response;
        this.user = this.loginService.user;
        this.initCourses();
      });
    } else {
      this.initCourses();
    }
  }

  private initCourses() {
    this.dashboardService.getCourses().subscribe((dashboardResponse: Array<Course>) => {
      console.log(dashboardResponse);
      this.courseList = dashboardResponse;
    });
  }

  public goToCourse() {
    this.router.navigate(['course']);
  }

}
