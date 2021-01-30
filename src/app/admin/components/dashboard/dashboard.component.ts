import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTES } from "../../../shared/core/routes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public courseHours = 50;
  public studentsNumber = 150;

  public courseListRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.COURSE_LIST}`;
  public usersRoute = `/${ROUTES.ADMIN.MAIN_ROUTE}/${ROUTES.ADMIN.USERS}`;

  constructor() { }

  ngOnInit(): void {
  }

}
