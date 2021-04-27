import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmationDialogDataInterface } from "./confirmation-dialog.interface";

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit {
    public commentBox: string = "";

    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogDataInterface) {
    }

    ngOnInit(): void {
    }

}
