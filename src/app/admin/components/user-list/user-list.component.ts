import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GridPropertiesInterface } from "../../../shared/components/grid/grid-properties.interface";
import { CustomTranslateService } from "../../../shared/services/custom-translate/custom-translate.service";

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

  constructor(private customTranslateService: CustomTranslateService) { }

  ngOnInit(): void {
    this.gridColumns = this.getGridColumns();

    this.gridProperties = UserListComponent.getGridProperties();
  }

  private getGridColumns() {
    return [
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
              handler: this.approveRowActionHandler
            },
            {
              label: this.customTranslateService.getTranslation("general.reject"),
              icon: "block",
              cls: "action-red",
              handler: this.rejectRowActionHandler
            }
          ]
        },
        sortable: false
      },
      {
        headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.firstName"),
        field: 'firstName'
      },
      {
        headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.lastName"),
        field: 'lastName'
      },
      {
        headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.courseName"),
        field: 'courseName'
      },
      {
        headerName: this.customTranslateService.getTranslation("admin.users.userList.columns.status"),
        field: 'status'
      }
    ]
  }

  private static getGridProperties(): GridPropertiesInterface {
    return {
      url: '/assets/json/userList.json'
    }
  }

  private approveRowActionHandler() {
    console.log("Aprobat");
  }

  private rejectRowActionHandler() {
    console.log("Respins");
  }


}
