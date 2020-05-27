import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CourseService} from './course.service';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../shared/interfaces/course';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {
  private courseId: string;
  public courseDetails: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseDetails(this.courseId).subscribe((response: Course) => {
      for (const chapter of response.chapters) {
        chapter.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(chapter.url);
        for (const resource of chapter.resources) {
          resource.safeUrl = this.sanitizer.bypassSecurityTrustUrl(resource.url);
        }
      }
      this.courseDetails = response;
    });
  }

}
