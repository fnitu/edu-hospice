import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from '../../interfaces/course';
import {GLOBALS} from '../../core/globals';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() hasAction: boolean = false;
  @Input() types: string[] = [];
  @Input() hideProgressbar: boolean;

  @Output() cardAction = new EventEmitter<any>();

  public defaultElevation: number = 2;
  public raisedElevation: number = 16;
  public DEFAULT_COURSE_IMG: string = GLOBALS.DATA_URL.DEFAULT_COURSE_IMG;


  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Emit cardAction event that triggers method from parent
   */
  public triggerCardAction() {
    if (this.hasAction) {
      this.cardAction.emit();
    }
  }
}
