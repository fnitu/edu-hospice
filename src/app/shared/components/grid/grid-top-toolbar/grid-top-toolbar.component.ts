import {
  Component,
  ViewEncapsulation,
  Input,
  ViewChild, ElementRef, OnDestroy, AfterViewInit
} from '@angular/core';
import { ResizeObserver } from 'resize-observer';
import {GridTopToolbarPageActionsInterface} from './grid-top-toolbar-page-actions.interface';

@Component({
  selector: 'app-grid-top-toolbar',
  templateUrl: './grid-top-toolbar.component.html',
  styleUrls: ['./grid-top-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridTopToolbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageToolbarActionList') pageToolbarActionList;

  @Input() pageActions: GridTopToolbarPageActionsInterface[];
  @Input() multipleActions;
  @Input() hideToolbar: boolean = false;

  private resizeObserver: ResizeObserver = null;

  constructor(private host: ElementRef) {
  }

  ngAfterViewInit() {
    this.initEvents();
  }

  private initEvents() {
    this.resizeObserver = new ResizeObserver(() => {

      if (this.pageActions) {
        this.recalculateOverflowList($(this.pageToolbarActionList.nativeElement));
      }

    });

    this.resizeObserver.observe(this.host.nativeElement);
  }

  private recalculateOverflowList($list) {
    if ($list.length) {
      $list.flexMenu({
        'undo': true
      }).flexMenu({
        'linkText': ' ',
        'linkTextAll': ' ',
        'linkTitle': '',
        'linkTitleAll': '',
        'cutoff': 0
      });
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.host.nativeElement);
  }
}
