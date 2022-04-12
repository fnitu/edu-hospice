import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CourseInterface} from './course.interface';
import {ROUTES} from '../../../../shared/core/routes';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {EditCourseContentDialogComponent} from './edit-course-content-dialog/edit-course-content-dialog.component';
import {CourseSectionAndContentService} from './course-section-and-content.service';
import {GLOBALS} from '../../../../shared/core/globals';
import {PlaceholderFormatService} from '../../../../shared/services/format/placeholder-format.service';
import {EditSectionDialogComponent} from './edit-section-dialog/edit-section-dialog.component';
import {ManageResourcesDialog} from './manage-resources-dialog/manage-resources-dialog.component';
import {SectionInterface} from './section.interface';
import {ContentInterface} from './content.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../../../shared/components/snack-bar/snack-bar.component';
import {ConfirmationDialogService} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.service';
import {CustomTranslateService} from '../../../../shared/services/custom-translate/custom-translate.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-section-and-content',
  templateUrl: './course-section-and-content.component.html',
  styleUrls: ['./course-section-and-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseSectionAndContentComponent implements OnInit {

  @Input() courseId: number;
  public course: CourseInterface = {};
  public editedSectionId;

  public editedContentId;
  private dialogRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public courseSectionAndContentService: CourseSectionAndContentService,
              private placeholderFormatService: PlaceholderFormatService,
              private matSnackBar: MatSnackBar,
              private confirmationDialogService: ConfirmationDialogService,
              private customTranslateService: CustomTranslateService) {
  }

  ngOnInit(): void {
    this.course.id = this.courseId;

    this.getSections();
  }

  private getSections() {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.ADMIN_COURSE_SECTIONS,
      {
        '{courseId}': this.courseId,
      }
    );

    this.courseSectionAndContentService.getSections(url).subscribe((response) => {
      this.course.sectionList = response;
    });
  }

  public addSection() {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.CREATE_SECTION,
      {
        '{courseId}': this.course.id,
      }
    );

    let data: SectionInterface = {
      name: 'Section',
      visible: true,
      adminContentDetails: [],
    };

    this.courseSectionAndContentService.addSection(url, data).subscribe((response) => {
      data.id = response.id;

      this.course.sectionList.push(data);
    });
  }

  public addContent(section) {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.CREATE_SECTION_CONTENT,
      {
        '{sectionId}': section.id,
      }
    );

    let data: ContentInterface = {
      name: 'Content',
      type: 'PDF',
      url: 'https://',
      visible: true,
      resourceSummary: [],
    };

    this.courseSectionAndContentService.addContent(url, data).subscribe((response) => {
      data.id = response.id;
      section.adminContentDetails.push(data);
    });
  }

  public editSectionTitle(section) {
    this.editedSectionId = section.id;
  }

  public setSectionTitle(event, section) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      this.editedSectionId = -1;

      const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_SECTION,
        {
          '{sectionId}': section.id,
        }
      );

      const data = {
        name: event.target.value,
        visible: section.visible
      };

      this.courseSectionAndContentService.updateSectionName(url, data).subscribe((response) => {

        if (response.success) {
          section.name = event.target.value;
        }

        this.matSnackBar.openFromComponent(SnackBarComponent, {
          verticalPosition: 'top',
          data: {
            content: response.message,
            type: GLOBALS.NOTIFICATIONS.INFO,
          },
        });
      });
    }
  }

  public deleteSection(section) {
    const dialogRef = this.confirmationDialogService.show({
      data: {
        title: this.customTranslateService.getTranslation(
          'confirmationDialog.deleteCourseSectionConfirmation'
        ),
        message: this.customTranslateService.getTranslation(
          'confirmationDialog.warning'
        ),
        buttons: [
          {
            text: this.customTranslateService.getTranslation('general.cancel')
          },
          {
            text: this.customTranslateService.getTranslation('general.confirm'),
            handler: () => {
              const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.DELETE_SECTION,
                {
                  '{sectionId}': section.id,
                }
              );

              this.courseSectionAndContentService.deleteSection(url).subscribe((response) => {
                this.matSnackBar.openFromComponent(SnackBarComponent, {
                  verticalPosition: 'top',
                  data: {
                    content: response.message,
                    type: GLOBALS.NOTIFICATIONS.INFO,
                  },
                });

                dialogRef.close();

                this.getSections();
              });
            }
          },
        ]
      }
    });
  }

  public editContentTitle(content) {
    this.editedContentId = content.id;
  }

  public setContentTitle(event, content) {
    if (event.keyCode === 13 || event.type === 'focusout') {
      this.editedContentId = -1;


      const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_SECTION_CONTENT_NAME,
        {
          '{contentId}': content.id,
        }
      );

      const data = {
        name: event.target.value
      };

      this.courseSectionAndContentService.updateContentName(url, data).subscribe((response) => {

        if (response.success) {
          content.name = event.target.value;
        }

        this.matSnackBar.openFromComponent(SnackBarComponent, {
          verticalPosition: 'top',
          data: {
            content: response.message,
            type: GLOBALS.NOTIFICATIONS.INFO,
          },
        });
      });
    }
  }

  public deleteContent(content) {
    const dialogRef = this.confirmationDialogService.show({
      data: {
        title: this.customTranslateService.getTranslation(
          'confirmationDialog.deleteCourseContentConfirmation'
        ),
        message: this.customTranslateService.getTranslation(
          'confirmationDialog.warning'
        ),
        buttons: [
          {
            text: this.customTranslateService.getTranslation('general.cancel')
          },
          {
            text: this.customTranslateService.getTranslation('general.confirm'),
            handler: () => {
              const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.DELETE_SECTION_CONTENT,
                {
                  '{contentId}': content.id,
                }
              );

              this.courseSectionAndContentService.deleteContent(url).subscribe((response) => {
                this.matSnackBar.openFromComponent(SnackBarComponent, {
                  verticalPosition: 'top',
                  data: {
                    content: response.message,
                    type: GLOBALS.NOTIFICATIONS.INFO,
                  },
                });

                dialogRef.close();

                this.getSections();
              });
            }
          },
        ]
      }
    });
  }

  public editSection(section) {
    const defaultConfig = {
      minWidth: 500,
      minHeight: 400,
      panelClass: 'editContentPanel',
      data: section,
      disableClose: true,
    };

    this.dialogRef = this.dialog.open(EditSectionDialogComponent, defaultConfig);
  }

  public editContent(content) {    
    const defaultConfig = {
      minWidth: 650,
      minHeight: 400,
      panelClass: 'editContentPanel',
      data: content,
    };

    this.dialogRef = this.dialog.open(EditCourseContentDialogComponent, defaultConfig);
  }

  public manageResources(content) {

    const defaultConfig = {
      panelClass: 'editContentPanel',
      data: content,
      disableClose: true,
    };

    this.dialogRef = this.dialog.open(ManageResourcesDialog, defaultConfig);
  }

  editVisibilityStatus(section) {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_SECTION,
      {
        '{sectionId}': section.id,
      }
    );

    const data = {
      name: section.name,
      visible: !section.visible
    };

    this.courseSectionAndContentService.updateSectionVisibility(url, data).subscribe((response) => {
      if (response.success) {
        section.visible = !section.visible;
      }

      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: response.message,
          type: GLOBALS.NOTIFICATIONS.INFO,
        },
      });
    });
  }

  public onListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.course.sectionList, event.previousIndex, event.currentIndex);

    const url = this.placeholderFormatService.stringFormat(
      GLOBALS.DATA_URL.REORDER_SECTION,
      {
        '{courseId}': this.courseId,
      }
    );

    this.courseSectionAndContentService.reorderSections( url, {ids: this.prepareCourseSectionList() }).subscribe();
  }

  private prepareCourseSectionList(): number[] {
    let sectionList: number[];

    sectionList = _.map(this.course.sectionList, (value, index) => {
      return value.id;
    });

    return sectionList;
  }

  public onContentListDropped(event: CdkDragDrop<string[]>, section) {
    moveItemInArray(section.adminContentDetails, event.previousIndex, event.currentIndex);

    const url = this.placeholderFormatService.stringFormat(
      GLOBALS.DATA_URL.REORDER_SECTION_CONTENT,
      {
        '{sectionId}': section.id,
      }
    );

    this.courseSectionAndContentService.reorderContent( url, {ids: this.prepareCourseSectionContentList(section) }).subscribe();
  }

  private prepareCourseSectionContentList(section): number[] {
    let contentList: number[];

    contentList = _.map(section.adminContentDetails, (value, index) => {
      return value.id;
    });

    return contentList;
  }
}
