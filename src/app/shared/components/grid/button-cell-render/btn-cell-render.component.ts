import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="grid-button" (click)="btnClickedHandler($event)">
      Edit
    </button>
  `,
  styleUrls: ['./btn-cell-render.component.scss'],
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  btnClickedHandler($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onClick(params);
    }
  }

  ngOnDestroy() {}
}
