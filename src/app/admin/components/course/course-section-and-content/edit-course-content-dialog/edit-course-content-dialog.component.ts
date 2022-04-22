import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomTranslateService} from '../../../../../shared/services/custom-translate/custom-translate.service';
import {FormControl} from '@angular/forms';
import * as _ from 'lodash';
import {GLOBALS} from '../../../../../shared/core/globals';
import {SnackBarComponent} from '../../../../../shared/components/snack-bar/snack-bar.component';
import {PlaceholderFormatService} from '../../../../../shared/services/format/placeholder-format.service';
import {EditCourseContentDialogService} from './edit-course-content-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QUIZ_TYPE } from "../../../new-quiz/quiz-settings/quiz-settings.component";

@Component({
  selector: 'app-edit-course-content-dialog',
  templateUrl: './edit-course-content-dialog.component.html',
  styleUrls: ['./edit-course-content-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCourseContentDialogComponent implements OnInit {

  myControl = new FormControl();
  dateControl = new FormControl();
  options: { type: string, label: string, id: number }[] = [
    {
      type: 'PDF',
      label: 'Presentation',
      id: 1
    },
    {
      type: 'VIDEO',
      label: 'Video',
      id: 3
    },
    {
      type: 'ZOOM',
      label: 'Zoom Meeting',
      id: 4
    },
    {
      type: 'QUIZ',
      label: 'Quiz',
      id: 2
    }
  ];

  public contentType;
  public url;

  public quizList;
  public quizId ;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private placeholderFormatService: PlaceholderFormatService,
              private editCourseContentDialogService: EditCourseContentDialogService,
              private matSnackBar: MatSnackBar,
              private dialogRef: MatDialogRef<EditCourseContentDialogComponent>,
              ) {
  }

  ngOnInit(): void {
    _.map(this.options, (item) => {
      if (item.type === this.data.type) {
        this.contentType = item;
      }
    });
    this.url = this.data.url;
    this.quizId = this.data.quiz_template_id ? this.data.quiz_template_id : "";
  }

  displayHandler(option) {
    this.contentType = option;

    return option?.label ? option.label : '';
  }

  public onContentTypeChange(obj) {
    if(obj.type === "QUIZ") {
      this.onGetQuizList()
    }
  }

  public updateContent() {

    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_SECTION_CONTENT,
      {
        '{contentId}': this.data.id,
      }
    );

    let options;
    switch(this.contentType.type) {
      case "QUIZ":
         options = {
            quiz_template_id:this.quizId
        };
        break;
      default:
        options = {
            url: this.url,
        };

      }
          
      let payload = {
        name: this.data.name,
        type: this.contentType.type,
        visible: true,
        options:options
      }

    this.editCourseContentDialogService.updateContent(url, payload).subscribe((response) => {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: response.message,
          type: GLOBALS.NOTIFICATIONS.INFO,
        },
      });

      if (response.success) {
        this.data.url = this.url;
        this.data.type = this.contentType.type;

        this.dialogRef.close();
      }
    });
  }

  public onGetQuizList(){
    this.editCourseContentDialogService.getQuizList().subscribe(x => this.quizList = x);
  }

  public getQuizClass(quiz){
    return quiz.type === QUIZ_TYPE.FEEDBACK_QUIZ ? 'feedback-quiz' : 'knowledge-quiz'
  }

}
