import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { PlaceholderFormatService } from "../../../shared/services/format/placeholder-format.service";
import { GLOBALS } from "../../../shared/core/globals";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-preview-quiz-dialog',
  templateUrl: './preview-quiz-dialog.component.html',
  styleUrls: ['./preview-quiz-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewQuizDialogComponent implements OnInit {
  public quizDetailsUrl: string = "";
  public quizQuestionsUrl: string = "";

  constructor( @Inject(MAT_DIALOG_DATA) private data,
               private placeholderFormatService: PlaceholderFormatService) { }

  ngOnInit(): void {
    this.prepareUrls();
  }

  private prepareUrls() {
    this.quizDetailsUrl = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_QUIZ_SETTINGS, {
      "{quizId}": this.data.quizId
    });

    this.quizQuestionsUrl = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.GET_QUIZ_QUESTIONS, {
      "{quizId}": this.data.quizId
    });
  }

}
