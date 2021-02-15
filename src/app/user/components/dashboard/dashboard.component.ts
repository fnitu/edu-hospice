import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import { ROUTES } from '../../../shared/core/routes';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public courseTabs;
  public types = ['recommended', 'finished'];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private authService: AuthService
  ) {}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    memberSince: 0,
    totalFinishedCourses: 0,
    totalHoursFinishedCourses: 0,
  } as User;

  ngOnInit(): void {
    this.getCurrentUser();
    this.fetchCourseTabs();
  }

  public goToCourse(course: Course) {
    this.router.navigate([
      `${ROUTES.USER.MAIN_ROUTE}/${ROUTES.USER.COURSE}`,
      course.id,
    ]);
  }

  private async getCurrentUser() {
    await this.authService.userDetails.then((data: User) => {
      this.dashboardService.userDetails(data.id).subscribe((data) => {
        this.user = data;
      });
    });
  }

  public fetchCourseTabs() {
    this.dashboardService.fetchCourseTabs().subscribe((response) => {
      this.courseTabs = response;
    });
  }

  private getTabData(tab) {
    this.dashboardService
      .fetchTabData(tab.link)
      .subscribe((response: Array<Course>) => {
        tab.courseList = response;
      });
  }

  public selectedTabChange(tab) {
    let currentTab = this.courseTabs[tab.index];

    // empty previous list
    currentTab.courseList = [];

    this.getTabData(currentTab);
  }
}
