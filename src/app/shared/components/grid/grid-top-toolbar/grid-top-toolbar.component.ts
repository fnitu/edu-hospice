import {
  Component,
  ViewEncapsulation,
  Input, OnInit
} from '@angular/core';
import {GridTopToolbarPageActionsInterface} from './grid-top-toolbar-page-actions.interface';

@Component({
  selector: 'app-grid-top-toolbar',
  templateUrl: './grid-top-toolbar.component.html',
  styleUrls: ['./grid-top-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridTopToolbarComponent implements OnInit {

  @Input() pageActions: GridTopToolbarPageActionsInterface[];
  @Input() multipleActions;
  @Input() hideToolbar: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
