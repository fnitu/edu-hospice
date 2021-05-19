import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CourseInterface} from './course.interface';
import {ROUTES} from '../../../shared/core/routes';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {EditCourseContentDialogComponent} from './edit-course-content-dialog/edit-course-content-dialog.component';
import {CreateCourseContentServiceService} from './create-course-content-service.service';
import {GLOBALS} from '../../../shared/core/globals';
import {PlaceholderFormatService} from '../../../shared/services/format/placeholder-format.service';

@Component({
  selector: 'app-create-course-content',
  templateUrl: './create-course-content.component.html',
  styleUrls: ['./create-course-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCourseContentComponent implements OnInit {

  public course: CourseInterface;
  public editedSectionId;
  public editedContentId;

  private dialogRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public createCourseContentServiceService: CreateCourseContentServiceService,
              private placeholderFormatService: PlaceholderFormatService) {
  }

  ngOnInit(): void {
    this.getCourseInfo();
  }

  public getCourseInfo() {
    const courseId = this.route.snapshot.paramMap.get('courseId');

    const url =  this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_COURSE_INFO, {
      '{id}': courseId
    });

    this.createCourseContentServiceService.getCourseInfo(url).subscribe((response) => {
      this.course = response;
    });
  }

  public addSection() {

    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.CREATE_SECTION, {
      '{courseId}': this.course.id
    });

    let data = {
      name: 'Section',
      visible: true,
      contentList: []
    };


    this.createCourseContentServiceService.addSection(url, data).subscribe((response) => {
      data['id'] = response.id;

      //FIXME section list from the server response
      if (!this.course.sectionList?.length) {
        this.course.sectionList = [];
      }

      this.course.sectionList.push(data);
    });
  }

  public addContent(section) {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.CREATE_SECTION_CONTENT, {
      '{sectionId}': section.id
    });

    let data = {
      name: 'Content',
      type: 'PDF',
      url: 'url',
      visible: true,
      resources: []
    };

    this.createCourseContentServiceService.addContent(url, data).subscribe((response) => {
      data['id'] = response.id;
      section.contentList.push(data);
    });
  }

  public editSectionTitle(section) {
    this.editedSectionId = section.id;
  }

  public setSectionTitle(event, section) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      section.name = event.target.value;
      this.editedSectionId = -1;
    }
  }

  public editContentTitle(content) {
    this.editedContentId = content.id;
  }

  public setContentTitle(event, content) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      content.name = event.target.value;
      this.editedContentId = -1;
    }
  }

  public editSection(section) {

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
