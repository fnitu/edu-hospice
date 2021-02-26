import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserListService } from '../user-list/user-list.service';
import { ROUTES } from '../../../shared/core/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public courseListRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.COURSE_LIST}`;

  public usersRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.USERS}/${this.adminService.USER_LIST_TYPES.ALL}`;
  public paymentRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.USERS}/${this.adminService.USER_LIST_TYPES.PAYMENT}`;
  public registrationRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.USERS}/${this.adminService.USER_LIST_TYPES.REGISTRATION}`;

  public registrationPending: number;
  public paymentPending: number;

  constructor(private adminService: UserListService) {}

  ngOnInit(): void {
    this.adminService.getStatusInfo().subscribe((data) => {
      this.paymentPending = data.paymentPending;
      this.registrationPending = data.registrationPending;
    });
  }
}
