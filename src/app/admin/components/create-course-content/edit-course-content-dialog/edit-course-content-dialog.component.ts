import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomTranslateService} from '../../../../shared/services/custom-translate/custom-translate.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-course-content-dialog',
  templateUrl: './edit-course-content-dialog.component.html',
  styleUrls: ['./edit-course-content-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCourseContentDialogComponent implements OnInit {

  public tabs: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditCourseContentDialogComponent>,
              private customTranslateService: CustomTranslateService,) {
  }

  ngOnInit(): void {
    this.tabs = [
      {
        label: 'Adauga Continut',
        content: 'addContentContainer',
        contentTypes: [
          {
            label: this.customTranslateService.getTranslation('admin.createCourseContent.editCourseContentDialog.presentation'),
            type: 'presentation'
          },
          {
            label: this.customTranslateService.getTranslation('admin.createCourseContent.editCourseContentDialog.video'),
            type: 'video'
          },
          {
            label: this.customTranslateService.getTranslation('admin.createCourseContent.editCourseContentDialog.conference'),
            type: 'conference'
          },
          {
            label: this.customTranslateService.getTranslation('admin.createCourseContent.editCourseContentDialog.quiz'),
            type: 'quiz'
          }
        ]
      },
      {
        label: 'Adauga Resurse',
        content: 'addResourcesContainer',
        editResource: true
      },
    ];
  }

  public setContentType(type) {
    this.data.contentType = type;
  }

  public saveResource(inputElement, tab) {
    const resource = {
      id: moment.default().unix(),
      url: inputElement.value
    };

    tab.editResource = false;
    this.data.resources.push(resource);
  }

  public addResource(tab) {
    tab.editResource = true;
  }
}
