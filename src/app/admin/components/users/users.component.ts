import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  constructor() { }

  // DUPLICATE from user-list.component
  public readonly USER_LIST_TYPES = {
    PAYMENT: "payment", // waiting after course payment
    REGISTRATION: "registration" // waiting after course registration
  }

  ngOnInit(): void {
  }

}
