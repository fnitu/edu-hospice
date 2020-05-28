import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import { LoginService } from '../login/login.service';
import { UserService } from "../user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public user: User;

    public courseList: Array<Course> = new Array<Course>();

    constructor(private loginService: LoginService,
                private dashboardService: DashboardService,
                private router: Router,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = this.userService.userDetails;

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

}
