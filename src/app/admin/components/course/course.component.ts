import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent implements OnInit {

  public selected = new FormControl(0);
  public courseId;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  public tabChange() {
    this.selected.setValue(this.selected.value + 1);
  }

  public changeTab(index) {
    this.selected.setValue(index);
  }

  public cardInfoSubmitedHandler(response){
    this.courseId = response.id;

    this.changeTab(2);
  }
}
