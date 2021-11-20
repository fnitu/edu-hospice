import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomTranslateService} from '../../../shared/services/custom-translate/custom-translate.service';
import { ROUTES } from "../../../shared/core/routes";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent implements OnInit {

  public selected = new FormControl(0);
  public courseId;
  public pageActions = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customTranslateService: CustomTranslateService) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.pageActions = this.generatePageActions();
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

  private generatePageActions() {
    return [
      {
        label: this.customTranslateService.getTranslation('admin.createCourse.showAllCourses'),
        handler: () => {
          this.router.navigate([ROUTES.ADMIN.COURSE_LIST], {
            relativeTo: this.route.parent,
          });
        }
      },
      {
        label: this.customTranslateService.getTranslation('admin.createCourse.addNewCourse'),
        handler: () => {
          this.router.navigate([ROUTES.ADMIN.COURSE.CREATE], {
            relativeTo: this.route.parent,
          });
        }
      }
    ];
  }
}
