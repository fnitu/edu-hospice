import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewQuizComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
