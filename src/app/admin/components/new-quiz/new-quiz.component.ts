import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewQuizComponent implements OnInit {
  public quizSettingSaved: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public quizSettingsSavedEventHandler() {
    this.quizSettingSaved = true;
  }

}
