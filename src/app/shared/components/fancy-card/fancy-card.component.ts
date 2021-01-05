import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-fancy-card',
  templateUrl: './fancy-card.component.html',
  styleUrls: ['./fancy-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FancyCardComponent implements OnInit {
  @Input() course: Course;
  @Input() types: string[];
  @Input() hasAction: boolean = false;

  @Output() cardAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public triggerCardAction() {
    if (this.hasAction) {
      this.cardAction.emit(this.course);
    }
  }
  
}
