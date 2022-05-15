import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/shared/interfaces/course';
import { ROUTES } from '../../../../shared/core/routes';
import { Router } from '@angular/router';
import { CONTENT_TYPE } from "../../../../admin/components/course/course.component";

@Component({
  selector: 'app-home-card-dialog',
  templateUrl: './home-card-dialog.component.html',
  styleUrls: ['./home-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeCardDialogComponent implements OnInit {
  @Output() registerFromDialog = new EventEmitter();

  public readonly CONTENT_TYPE_TEMPLATE = CONTENT_TYPE;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerButtonHandler() {
    if (this.data.type) {
      this.registerFromDialog.emit(this.data);
    } else {
      this.router.navigate([ROUTES.PREVIEW.MAIN_ROUTE, ROUTES.PREVIEW.LOGIN]);
    }
  }
}
