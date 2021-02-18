import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserListService } from "../user-list/user-list.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  public selectedIndex;

  constructor(private route: ActivatedRoute,
              public userListService: UserListService) { }

  private readonly USER_LIST_TABS = {
    registration: {
      selectedIndex: 0
    },
    payment: {
      selectedIndex: 1
    },
    all: {
      selectedIndex: 2
    }
  }

  ngOnInit(): void {

    this.selectedIndex = this.USER_LIST_TABS[this.route.snapshot.params.listType].selectedIndex;
  }

}
