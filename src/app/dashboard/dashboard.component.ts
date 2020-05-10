import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../common/login.service';
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
  private token: string;

  public tabList = ['In desfasurare', 'Recomandat', 'Certificate'];
  public courseList: Array<Course> = new Array<Course>();

  constructor(private loginService: LoginService, private dashboardService: DashboardService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.user && this.token) {
      this.loginService.getUserDetails(this.token).subscribe((response: User) => {
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

  public goToCourse(course: Course) {
    this.router.navigate(['course', this.token, 'course', course.id]);
  }

}
