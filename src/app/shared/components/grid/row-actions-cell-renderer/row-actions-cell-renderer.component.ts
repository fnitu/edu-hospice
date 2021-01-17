import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { RowActionInterface } from "./row-action.interface";

@Component({
    selector: 'app-row-actions-cell-renderer',
    templateUrl: './row-actions-cell-renderer.component.html',
    styleUrls: ['./row-actions-cell-renderer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RowActionsCellRendererComponent implements ICellRendererAngularComp, OnDestroy {
    private params: any;
    public actions: RowActionInterface[];

    agInit(params: any): void {
        this.params = params;

        this.actions = params.actions;
    }

    ngOnDestroy(): void {
    }

    refresh(params: any): boolean {
        return false;
    }
}
