import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Course } from '../../interfaces/course';
import { GLOBALS } from '../../core/globals';
import { UserListService } from 'src/app/admin/components/user-list/user-list.service';
import { PlaceholderFormatService } from '../../services/format/placeholder-format.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/interfaces/user';
import { AuthService } from '../../services/authentication/auth.service';
import { Tabs } from '../../interfaces/tabs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() hasAction: boolean = false;
  @Input() types: string[] = [];
  @Input() hideProgressbar: boolean;
  @Input() tab: Tabs;

  @Output() cardAction = new EventEmitter<any>();

  public defaultElevation: number = 2;
  public raisedElevation: number = 16;
  public DEFAULT_COURSE_IMG: string = GLOBALS.DEFAULT_COURSE_IMG;

  constructor(
    private userListService: UserListService,
    private placeholderFormat: PlaceholderFormatService,
    private matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  /**
   * Emit cardAction event that triggers method from parent
   */
  public triggerCardAction() {
    if (this.hasAction) {
      this.cardAction.emit();
    }
  }

  public registerClick(courseId, $event) {
    $event.stopPropagation();
    let userId;

    this.authService.currentUserResponse.subscribe((data: User) => {
      userId = data.id;
    });

    const urlParams = {
      '{userId}': userId,
      '{courseId}': courseId,
    };

    const url = this.placeholderFormat.stringFormat(
      GLOBALS.DATA_URL.REGISTER_COURSES,
      urlParams
    );

    this.userListService.register(url).subscribe((result) => {
      if (result) {
        this.matSnackBar.open(result.message, GLOBALS.NOTIFICATIONS.INFO, {
          duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
