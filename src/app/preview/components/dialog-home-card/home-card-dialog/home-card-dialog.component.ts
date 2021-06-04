import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-home-card-dialog',
  templateUrl: './home-card-dialog.component.html',
  styleUrls: ['./home-card-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeCardDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Course) {}

  ngOnInit(): void {}
}
