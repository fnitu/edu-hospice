import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTES } from '../../../../shared/core/routes';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { CourseInterface } from '../../create-course-content/course.interface';
import { EditSectionDialogComponent } from './edit-section-dialog/edit-section-dialog.component';
import { CourseSectionService } from './course-section.service';
import { Subscription } from 'rxjs';
import { EditCourseContentDialogComponent } from '../../create-course-content/edit-course-content-dialog/edit-course-content-dialog.component';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseSectionsComponent implements OnInit, OnDestroy {
  public course: CourseInterface;
  public sections: CourseInterface[];
  public courseSections: Subscription;
  private dialogRef;
  public title;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseSectionService: CourseSectionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.courseSectionService.courseTitle.subscribe((courseTitle) => {
      this.title = courseTitle;
    });

    let id;

    this.route.params.subscribe((params) => {
      id = params.id;
    });

    this.courseSections = this.courseSectionService
      .getSections(id)
      .subscribe((data) => {
        this.sections = data;
      });
  }

  public addSection() {
    const sectionNumber = this.sections.length + 1;

    const section = {
      title: `Sectiunea ${sectionNumber}`,
      sectionId: moment.default().unix(),
      number: sectionNumber,
      editSection: false,
      contentList: [
        {
          id: moment.default().unix(),
          title: 'Continutul 1',
          contentType: 'presentation',
          editContent: false,
          resources: [],
        },
      ],
    };

    // this.sections.push(section);
  }

  public editSection(section) {
    const defaultConfig = {
      minWidth: 500,
      minHeight: 400,
      panelClass: 'editContentPanel',
      data: section,
      disableClose: true,
    };

    this.dialogRef = this.dialog.open(
      EditSectionDialogComponent,
      defaultConfig
    );
  }

  public addContent(section) {
    const content = {
      id: moment.default().unix(),
      title: `Continutul ${this.sections.length + 1}`,
      contentType: 'presentation',
      resources: [],
    };

    // section.contentList.push(content);
  }

  public editSectonTitle(section) {
    section.editSection = true;
  }

  public setSectionTitle(event, section) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      section.title = event.target.value;
      section.editSection = false;
    }
  }

  public editContentTitle(content) {
    content.editContent = true;
  }

  public setContentTitle(event, content) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      content.title = event.target.value;
      content.editContent = false;
    }
  }

  public editContent(content) {
    const defaultConfig = {
      minWidth: 500,
      minHeight: 400,
      panelClass: 'editContentPanel',
      data: content,
    };

    this.dialogRef = this.dialog.open(
      EditCourseContentDialogComponent,
      defaultConfig
    );
  }

  public beakToCourseListHandler() {
    this.router.navigate([ROUTES.ADMIN.COURSE_LIST], {
      relativeTo: this.route.parent,
    });
  }

  ngOnDestroy() {
    this.courseSections.unsubscribe();
  }
}
