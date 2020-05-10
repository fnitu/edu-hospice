import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HomeService} from './home.service';
import {Course} from '../common/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public courseList: Array<Course> = new Array<Course>();
  public tabList = ['Noutati', 'Asistenti', 'Altii', 'Toate cursurile'];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getCourses().subscribe((response: Array<Course>) => {
      console.log(response);
      this.courseList = response;
    });
  }

}
