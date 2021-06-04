import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from './home.service';
import { Course } from '../../../shared/interfaces/course';
import { GLOBALS } from '../../../shared/core/globals';
import { MatDialog } from '@angular/material/dialog';
import { HomeCardDialogComponent } from '../dialog-home-card/home-card-dialog/home-card-dialog.component';
import { PlaceholderFormatService } from 'src/app/shared/services/format/placeholder-format.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public courseList: Array<Course> = new Array<Course>();
  private dialogRef;
  public courseId = 0;
  public courseContent;

  constructor(
    private homeService: HomeService,
    public dialog: MatDialog,
    private placeholderFormatService: PlaceholderFormatService
  ) {}

  ngOnInit(): void {
    const url = GLOBALS.DATA_URL.COURSES;

    this.homeService.getCourses(url).subscribe((response: Array<Course>) => {
      this.courseList = response;
    });
  }

  public dialogCourse(course) {
    const url = this.placeholderFormatService.stringFormat(
      GLOBALS.DATA_URL.GET_COURSE_INFO,
      {
        '{id}': course.id,
      }
    );

    this.homeService.getCourseInfo(url).subscribe((response) => {
      this.courseContent = response;

      const defaultConfig = {
        maxWidth: 781,
        minWidth: 500,
        minHeight: 600,
        data: this.courseContent,
        disableClose: false,
      };

      this.dialogRef = this.dialog.open(HomeCardDialogComponent, defaultConfig);
    });
  }
}
