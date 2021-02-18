import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import { ROUTES } from '../../../shared/core/routes';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import {BASE_URL, GLOBALS} from '../../../shared/core/globals';
import {PlaceholderFormatService} from '../../../shared/services/format/placeholder-format.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public courseTabs;
  public types = ['recommended', 'finished'];

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private authService: AuthService,
              private placeholderFormat: PlaceholderFormatService) {}

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
  }

  public goToCourse(course: Course) {
    this.router.navigate([
      `${ROUTES.USER.MAIN_ROUTE}/${ROUTES.USER.COURSE}`,
      course.id,
    ]);
  }

  private getCurrentUser() {
    this.authService.currentUserResponse.subscribe((data: User) => {
      let url = GLOBALS.DATA_URL.USER_DETAILS_URL;

      const params = {
        "{id}": data.id
      };

      url = this.placeholderFormat.stringFormat(url, params);

      this.dashboardService.userDetails(url).subscribe((user) => {
        this.user = user;

        this.fetchCourseTabs();
      });
    });
  }

  public fetchCourseTabs() {
    let url = GLOBALS.DATA_URL.COURSES_TABS;

    const params = {
      "{userId}": this.user.id
    };

    url = this.placeholderFormat.stringFormat(url, params);
    // url = './assets/json/courseTabs.json';

    this.dashboardService.fetchCourseTabs(url).subscribe((response) => {
      this.courseTabs = response;
    });
  }

  private getTabData(tab) {
    if (!tab.courseList){
      const url = BASE_URL + tab.link;
      // const url = tab.link;

      this.dashboardService
        .fetchTabData(url)
        .subscribe((response: Array<Course>) => {
          tab.courseList = response;
        });
    }
  }

  public selectedTabChange(tab) {
    const currentTab = this.courseTabs[tab.index];

    this.getTabData(currentTab);
  }
}
