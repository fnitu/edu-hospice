import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GridPropertiesInterface } from "../../../shared/components/grid/grid-properties.interface";
import { CustomTranslateService } from "../../../shared/services/custom-translate/custom-translate.service";
import { ConfirmationDialogService } from "../../../shared/components/confirmation-dialog/confirmation-dialog.service";
import { GLOBALS } from "../../../shared/core/globals";
import { UserListService } from "./user-list.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    @Input() listType: string;

    public gridProperties: GridPropertiesInterface;
    public gridColumns: any[];

    constructor(private customTranslateService: CustomTranslateService,
                private confirmationDialogService: ConfirmationDialogService,
                private userListService: UserListService) {
    }

    ngOnInit(): void {
        this.gridColumns = this.getGridColumns();

        this.gridProperties = this.getGridProperties();
    }

    private getGridColumns() {
        let gridColumns = [];

        const allList = this.listType === this.userListService.USER_LIST_TYPES.ALL;

        if (!allList) {
            gridColumns.push(
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.actions"),
                    field: "actions",
                    cellRenderer: "rowActionsCellRenderer",
                    maxWidth: 120,
                    minWidth: 120,
                    cellRendererParams: {
                        actions: [
                            {
                                label: this.customTranslateService.getTranslation("general.approve"),
                                icon: "verified",
                                cls: "action-green",
                                handler: (params) => this.approveRowActionHandler(params)
                            },
                            {
                                label: this.customTranslateService.getTranslation("general.reject"),
                                icon: "block",
                                cls: "action-red",
                                handler: (params) => this.rejectRowActionHandler(params)
                            }
                        ]
                    },
                    sortable: false
                }
            );
        }

        gridColumns.push(
            {
                headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.firstName"),
                field: 'firstName'
            },
            {
                headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.lastName"),
                field: 'lastName'
            }
        );

        if (!allList) {
            gridColumns.push(
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.courseName"),
                    field: 'courseName'
                },
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.status"),
                    cellRenderer: (data) => {
                        return this.customTranslateService.getTranslation(`course.status.${data.value}`)
                    },
                    width: 300,
                    field: 'status'
                }
            );
        } else {
            gridColumns.push(
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.numberOfOnGoingCourses"),
                    field: 'ongoingCourses',
                    width: 300
                },
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.numberOfPendingCourses"),
                    field: 'pendingCourses',
                    width: 300
                },
                {
                    headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.numberOfFinalizedCourses"),
                    field: 'finalizedCourses',
                    width: 300
                }
            );
        }


        return gridColumns;
    }

    private getGridProperties(): GridPropertiesInterface {
        return {
            url: this.getUrl()
        };
    }

    private getUrl(): string {
        let url = '';

        switch (this.listType) {
            case this.userListService.USER_LIST_TYPES.PAYMENT:
                url = GLOBALS.DATA_URL.USER_LIST_WAITING_FOR_PAYMENT;
                break;
            case this.userListService.USER_LIST_TYPES.REGISTRATION:
                url = GLOBALS.DATA_URL.USER_LIST_WAITING_FOR_REGISTRATION;
                break;
            default:
                url = GLOBALS.DATA_URL.USER_LIST;
                break;
        }

        return url;
    }

    private approveRowActionHandler(params) {
        let dialogRef = this.confirmationDialogService.show({
            data: {
                message: this.customTranslateService.getTranslation("admin.users.userList.approveMessage"),
                buttons: [
                    {
                        text: this.customTranslateService.getTranslation("general.yes"),
                        handler: () => {
                            console.log("Refresh grid");

                            dialogRef.close();
                        }
                    },
                    {
                        text: this.customTranslateService.getTranslation("general.no")
                    }
                ]
            }
        });
    }

    private rejectRowActionHandler(params) {
        let dialogRef = this.confirmationDialogService.show({
            data: {
                message: this.customTranslateService.getTranslation("admin.users.userList.rejectMessage"),
                hasCommentBox: true,
                buttons: [
                    {
                        text: this.customTranslateService.getTranslation("general.yes"),
                        handler: () => {
                            console.log("Refresh grid");
                            console.log("Comment box text:", dialogRef.componentInstance.commentBox);

                            dialogRef.close();
                        }
                    },
                    {
                        text: this.customTranslateService.getTranslation("general.no")
                    }
                ]
            }
        });
    }
}
