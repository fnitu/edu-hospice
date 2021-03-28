import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { GridPropertiesInterface } from "../../../shared/components/grid/grid-properties.interface";
import { CustomTranslateService } from "../../../shared/services/custom-translate/custom-translate.service";
import { ConfirmationDialogService } from "../../../shared/components/confirmation-dialog/confirmation-dialog.service";
import { GLOBALS } from "../../../shared/core/globals";
import { UserListService } from "./user-list.service";
import {PlaceholderFormatService} from '../../../shared/services/format/placeholder-format.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

    @ViewChild('gridComponent') gridComponent;

    @Input() listType: string;

    public gridProperties: GridPropertiesInterface;
    public gridColumns: any[];

    constructor(private customTranslateService: CustomTranslateService,
                private confirmationDialogService: ConfirmationDialogService,
                private userListService: UserListService,
                private placeholderFormat: PlaceholderFormatService,
                private matSnackBar: MatSnackBar) {
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
                        return this.customTranslateService.getTranslation(`course.status.${data.value}`);
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
            url: this.getUrl(),
            actionsUrl: this.getActionsUrl(),
            actions: {
              page: {
                doSomething: {
                  handler: (button) => {
                    console.log("doSomething");
                    debugger;
                  }
                },
                registrationActionTwo: {
                  handler: (button) => {
                    console.log('registrationActionTwo');
                    debugger;
                  }
                },
                paymentDoSomething: {
                  handler: (button) => {
                    console.log('paymentDoSomething');
                    debugger;
                  }
                },
                paymentActionTwo: {
                  handler: (button) => {
                    console.log('paymentActionTwo');
                    debugger;
                  }
                }
              }
            }
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

    private getActionsUrl(): string {
      let url = '';

      // FIXME add url for actions
      switch (this.listType) {
        case this.userListService.USER_LIST_TYPES.PAYMENT:
          url = GLOBALS.DATA_URL.ACTION_LIST_WAITING_FOR_PAYMENT;
          break;
        case this.userListService.USER_LIST_TYPES.REGISTRATION:
          url = GLOBALS.DATA_URL.ACTION_LIST_WAITING_FOR_REGISTRATION;
          break;
        default:
          url = 'GLOBALS.DATA_URL.USER_LIST';
          break;
      }

      return url;
    }

    private approveRowActionHandler(params) {
        const dialogRef = this.confirmationDialogService.show({
            data: {
                message: this.customTranslateService.getTranslation("admin.users.userList.approveMessage"),
                buttons: [
                    {
                        text: this.customTranslateService.getTranslation("general.yes"),
                        handler: () => {
                            let url = GLOBALS.DATA_URL.APPROVE_COURSE;
                            const urlParams = {
                              "{userId}": params.data.userId,
                              "{courseId}": params.data.courseId,
                            };

                            url = this.placeholderFormat.stringFormat(url, urlParams);

                            this.userListService.approveRowAction(url, {}).subscribe((result) => {
                              if (result.success) {

                                this.matSnackBar.open(result.message, GLOBALS.NOTIFICATIONS.INFO, {
                                  duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                                  verticalPosition: 'top'
                                });

                              }

                              this.gridComponent.refreshGrid();

                              dialogRef.close();
                            });
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
        const dialogRef = this.confirmationDialogService.show({
            data: {
                message: this.customTranslateService.getTranslation("admin.users.userList.rejectMessage"),
                hasCommentBox: true,
                buttons: [
                    {
                        text: this.customTranslateService.getTranslation("general.yes"),
                        handler: () => {
                          let url = GLOBALS.DATA_URL.REJECT_COURSE;
                          const urlParams = {
                            "{userId}": params.data.userId,
                            "{courseId}": params.data.courseId,
                          };

                          const data = {
                            message: dialogRef.componentInstance.commentBox
                          };

                          url = this.placeholderFormat.stringFormat(url, urlParams);

                          this.userListService.rejectRowAction(url, data).subscribe((result) => {
                            if (result.success) {

                              this.matSnackBar.open(result.message, GLOBALS.NOTIFICATIONS.INFO, {
                                duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                                verticalPosition: 'top'
                              });

                            }

                            this.gridComponent.refreshGrid();

                            dialogRef.close();
                          });
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
