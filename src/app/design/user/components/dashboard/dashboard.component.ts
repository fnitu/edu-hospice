import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import {LoginService} from '../../../../preview/components/login/login.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    public user: User;

    public recommendedCourseList: Array<Course> = new Array<Course>();
    public finishedCourseList: Array<Course> = new Array<Course>();
    public courseList: Array<Course> = new Array<Course>();

    private mediaSub: Subscription;

    constructor(private dashboardService: DashboardService,
                private router: Router,
                private loginService: LoginService,
                private mediaObserver: MediaObserver,) {
    }

    ngOnInit(): void {
        this.user = this.loginService.userDetails;

        this.mediaSub = this.mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                console.log(change.mqAlias);
                console.log(change.mediaQuery);
            }
        );

        this.initCourses();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if(this.mediaSub) {
            this.mediaSub.unsubscribe();
        }
    }
    

    private initCourses() {
        this.dashboardService.getCourses(['active','recommended']).subscribe((dashboardResponse: Array<Course>) => {
            this.courseList = dashboardResponse;            
        });

        this.dashboardService.getCourses(['recommended']).subscribe((dashboardResponse: Array<Course>) => {
            this.recommendedCourseList = dashboardResponse;
        });

        this.dashboardService.getCourses(['finished']).subscribe((dashboardResponse: Array<Course>) => {
            this.finishedCourseList = dashboardResponse;
        });
    }

    public goToCourse(course: Course) {
        this.router.navigate(['design/user/course', 'course', course.id]);
    }
}
