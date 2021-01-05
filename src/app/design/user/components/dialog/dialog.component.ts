import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input() chapter: any;

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        chapter: this.chapter
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})

export class DialogContentComponent implements OnInit {

  chapter: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.chapter = this.data.chapter;
  }
}
