import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import _ from "lodash";
import { ConfirmationDialogInterface } from "./confirmation-dialog.interface";

@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {

    constructor(public dialog: MatDialog) {
    }

    public show(config?: ConfirmationDialogInterface) {
        const DEFAULT_CONFIG = {
            minWidth: "500px",
            minHeight: "100px"
        };

        _.merge(DEFAULT_CONFIG, config)

        return this.dialog.open(ConfirmationDialogComponent, DEFAULT_CONFIG);
    }
}
