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

    public courseTabs

    constructor(private dashboardService: DashboardService,
                private router: Router,
                private loginService: LoginService,
                ) {
    }

    ngOnInit(): void {
        this.userDetails();
        this.fetchCourseTabs();
    }

    public goToCourse(course: Course) {
        this.router.navigate(['user/course', 'course', course.id]);
    }

    private userDetails() {
      this.dashboardService.getUserDetails().subscribe((data: User) => {
        this.user = data;
      });
    }

    public fetchCourseTabs(){
        this.dashboardService.fetchCourseTabs().subscribe(
            (response) => {
                this.courseTabs = response;
            }
        );
    }

    private getTabData(tab) {
        this.dashboardService.fetchTabData(tab.link).subscribe(
            (response: Array<Course>) => {
                tab.courseList = response;
            }
        );
    }

    public selectedTabChange(tab) {
        let  currentTab = this.courseTabs[tab.index];

        // empty previous list
        currentTab.courseList = [];

        this.getTabData(currentTab);
    }

}
