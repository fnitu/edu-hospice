import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import { LoginService } from '../../../preview/components/login/login.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    user = {
      firstName: '',
      lastName: '',
      email: ''
    } as User ;

    public courseList: Array<Course> = new Array<Course>();

    constructor(private dashboardService: DashboardService,
                private router: Router,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.userDetails();
        this.initCourses();
    }

    private initCourses() {
        this.dashboardService.getCourses().subscribe((dashboardResponse: Array<Course>) => {
            this.courseList = dashboardResponse;
        });
    }

    public goToCourse(course: Course) {
        this.router.navigate(['user/course', 'course', course.id]);
    }

    private userDetails() {
      this.dashboardService.getUserDetails().subscribe((data: User) => {
        this.user = data;
      });
    }
}
