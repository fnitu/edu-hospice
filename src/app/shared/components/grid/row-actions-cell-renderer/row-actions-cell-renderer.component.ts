import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RowActionInterface } from './row-action.interface';

@Component({
  selector: 'app-row-actions-cell-renderer',
  templateUrl: './row-actions-cell-renderer.component.html',
  styleUrls: ['./row-actions-cell-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RowActionsCellRendererComponent
  implements ICellRendererAngularComp, OnDestroy
{
  public params: any;
  public actions: RowActionInterface[];
  public title: string;

  agInit(params: any): void {
    this.params = params;

    this.title = this.params.data.name;
    this.actions = params.actions;
    // this.actions['text'] = this.params.data.name;
  }

  ngOnDestroy(): void {}

  refresh(params: any): boolean {
    return false;
  }
}
