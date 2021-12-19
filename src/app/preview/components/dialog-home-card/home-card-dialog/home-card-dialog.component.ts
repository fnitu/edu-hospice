import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/shared/interfaces/course';
import {ROUTES} from '../../../../shared/core/routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-card-dialog',
  templateUrl: './home-card-dialog.component.html',
  styleUrls: ['./home-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeCardDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Course,
              private router: Router) {}

  ngOnInit(): void {}

  registerButtonHandler() {
    this.router.navigate([ROUTES.PREVIEW.MAIN_ROUTE, ROUTES.PREVIEW.REGISTER]);
  }
}
