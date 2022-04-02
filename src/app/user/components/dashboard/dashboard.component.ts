import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';
import { Course } from '../../../shared/interfaces/course';
import { DashboardService } from './dashboard.service';
import { ROUTES } from '../../../shared/core/routes';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { GLOBALS } from '../../../shared/core/globals';
import { environment } from '../../../../environments/environment';
import { PlaceholderFormatService } from '../../../shared/services/format/placeholder-format.service';
import { HomeCardDialogComponent } from '../../../preview/components/dialog-home-card/home-card-dialog/home-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadProfilePictureDialogComponent } from './upload-profile-picture-dialog/upload-profile-picture-dialog.component';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { UserListService } from 'src/app/admin/components/user-list/user-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public courseTabs;

  public selectedIndex: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private authService: AuthService,
    private placeholderFormat: PlaceholderFormatService,
    private placeholderFormatService: PlaceholderFormatService,
    public dialog: MatDialog,
    private confirmationDialogService: ConfirmationDialogService,
    private customTranslateService: CustomTranslateService,
    private userListService: UserListService,
    private matSnackBar: MatSnackBar
  ) {}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    memberSince: 0,
    totalFinishedCourses: 0,
    totalHoursFinishedCourses: 0,
    phoneNumber: ""
  } as unknown as User;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public goToCourse(course: Course, tab) {
    if (
      tab.type === 'RECOMMENDED' ||
      tab.type === 'PENDING' ||
      tab.type === 'FINISHED' ||
      tab.type === 'REJECTED'
    ) {
      this.dialogCourse(course.id, tab.type);
    } else {
      this.router.navigate([
        `${ROUTES.USER.MAIN_ROUTE}/${ROUTES.USER.COURSE}`,
        course.id,
      ]);
    }
  }

  public dialogCourse(id, type) {
    const url = this.placeholderFormatService.stringFormat(
      GLOBALS.DATA_URL.GET_COURSE_INFO,
      {
        '{id}': id,
      }
    );

    this.dashboardService.getCourseInfo(url).subscribe((response) => {
      const courseContent = response;

      const defaultConfig = {
        maxWidth: 800,
        minWidth: 800,
        maxHeight: 600,
        minHeight: 600,
        data: { ...courseContent, type: type },
        disableClose: false,
      };

      let dialogRef = this.dialog.open(HomeCardDialogComponent, defaultConfig);
      dialogRef.componentInstance.registerFromDialog.subscribe((course) => {
        console.log(course.id);

        const confirmationDialogRef = this.confirmationDialogService.show({
          data: {
            message: this.customTranslateService.getTranslation(
              'confirmationDialog.courseRegister'
            ),
            buttons: [
              {
                text: this.customTranslateService.getTranslation(
                  'general.cancel'
                ),
              },
              {
                text: this.customTranslateService.getTranslation(
                  'general.confirm'
                ),
                handler: () => {
                  let userId;

                  this.authService.currentUserResponse.subscribe(
                    (data: User) => {
                      userId = data.id;
                    }
                  );

                  const urlParams = {
                    '{userId}': userId,
                    '{courseId}': course.id,
                  };

                  const url = this.placeholderFormat.stringFormat(
                    GLOBALS.DATA_URL.REGISTER_COURSES,
                    urlParams
                  );
                  this.userListService.register(url).subscribe((result) => {
                    if (result) {
                      this.matSnackBar.open(
                        result.message,
                        GLOBALS.NOTIFICATIONS.INFO,
                        {
                          duration:
                            GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                          verticalPosition: 'bottom',
                        }
                      );
                      this.redirectTab();
                    }
                  });
                  confirmationDialogRef.close();
                },
              },
            ],
          },
        });
      });
    });
  }

  private getCurrentUser() {
    this.authService.currentUserResponse.subscribe((data: User) => {
      let url = GLOBALS.DATA_URL.USER_DETAILS;

      const params = {
        '{id}': data.id,
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
      '{userId}': this.user.id,
    };

    url = this.placeholderFormat.stringFormat(url, params);

    this.dashboardService.fetchCourseTabs(url).subscribe((response) => {
      this.courseTabs = response;
    });
  }

  public redirectTab() {
    let url = GLOBALS.DATA_URL.COURSES_TABS;

    const params = {
      '{userId}': this.user.id,
    };

    url = this.placeholderFormat.stringFormat(url, params);

    this.dashboardService.fetchCourseTabs(url).subscribe((response) => {
      this.courseTabs = response;
      for (const [index, tab] of this.courseTabs.entries()) {
        if (tab.type === 'PENDING') {
          this.selectedIndex = index;
        }
      }
    });
  }

  public getTabData(tab) {
    const url = environment.BASE_URL + tab.link;

    this.dashboardService
      .fetchTabData(url)
      .subscribe((response: Array<Course>) => {
        tab.courseList = response;
      });
  }

  public selectedTabChange(tab) {
    this.selectedIndex = tab.index;

    const currentTab = this.courseTabs[tab.index];

    this.getTabData(currentTab);
  }

  public uploadProfilePicture(event) {
    event.preventDefault();

    const defaultConfig = {
      maxWidth: 781,
      minWidth: 500,
      minHeight: 400,
      panelClass: 'editContentPanel',
    };

    this.dialog.open(UploadProfilePictureDialogComponent, defaultConfig);
  }
}
