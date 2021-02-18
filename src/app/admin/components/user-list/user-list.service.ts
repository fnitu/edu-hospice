import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public readonly USER_LIST_TYPES = {
    PAYMENT: "payment", // waiting after course payment
    REGISTRATION: "registration", // waiting after course registration,
    ALL: "all"
  }

  constructor() { }
}
