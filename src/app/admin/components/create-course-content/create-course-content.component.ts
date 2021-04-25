import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CourseInterface} from './course.interface';
import {ROUTES} from '../../../shared/core/routes';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {EditCourseContentDialogComponent} from './edit-course-content-dialog/edit-course-content-dialog.component';

@Component({
  selector: 'app-create-course-content',
  templateUrl: './create-course-content.component.html',
  styleUrls: ['./create-course-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCourseContentComponent implements OnInit {

  public course: CourseInterface;
  private dialogRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog)
  { }

  ngOnInit(): void {
    this.course = {
      id: 1111,
      title: 'Titlul cursului',
      sectionList: [
        {
          title: 'Sectiunea 1',
          sectionId: 2222,
          number: 1,
          editSection: false,
          contentList: [
            {
              contentId: 2223,
              title: 'Continutul 1',
              contentType: 'presentation',
              editContent: false,
              resources: []
            }
          ]
        }
      ]
    };
  }

  public addSecton() {
    const sectionNumber = this.course.sectionList.length + 1;

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
          resources: []
        }
      ]
    };

    this.course.sectionList.push(section);
  }

  public addContent(section) {
    const content = {
      id: moment.default().unix(),
      title: `Continutul ${section.contentList.length + 1}`,
      contentType: 'presentation',
      resources: []
    };

    section.contentList.push(content);
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
      data: content
    };

    this.dialogRef = this.dialog.open(EditCourseContentDialogComponent, defaultConfig);
  }

  public beakToCourseListHandler() {
    this.router.navigate([ROUTES.ADMIN.COURSE_LIST], {relativeTo: this.route.parent});
  }
}
