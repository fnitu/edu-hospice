import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() hasAction: boolean = false;

  @Output() cardAction = new EventEmitter<any>();

  public defaultElevation: number = 2;
  public raisedElevation: number = 16;

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
