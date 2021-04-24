import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CourseInterface} from './course.interface';
import {ROUTES} from '../../../shared/core/routes';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-course-content',
  templateUrl: './create-course-content.component.html',
  styleUrls: ['./create-course-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCourseContentComponent implements OnInit {

  public course: CourseInterface;

  constructor(private router: Router,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.course = {
      id: 1111,
      title: 'Titlul cursului',
      sectionList: [
        {
          title: 'Sectiunea 1',
          sectionId: 2222,
          number: 1,
          contentList: [
            {
              contentId: 2223,
              title: 'Continutul 1',
              contentType: 'presentation',
              resources: []
            }
          ]
        }
      ]
    };
  }

  public addSecton() {
    const sectionNumber = this.course.sectionList.length + 1;

    const section = {
      title: `Sectiunea ${sectionNumber}`,
      sectionId: moment.default().unix(),
      number: sectionNumber,
      contentList: [
        {
          id: moment.default().unix(),
          title: 'Continutul 1',
          contentType: 'presentation',
          resources: []
        }
      ]
    };

    this.course.sectionList.push(section);
  }

  public addContent(section) {
    const content = {
      id: moment.default().unix(),
      title: `Continutul ${section.contentList.length + 1}`,
      contentType: 'presentation',
      resources: []
    };

    section.contentList.push(content);
  }

  public editContent(section, content) {
    console.log(section);
    debugger;
  }

  public beakToCourseListHandler() {
    this.router.navigate([ROUTES.ADMIN.COURSE_LIST], {relativeTo: this.route.parent});
  }
}
