import { Injectable } from '@angular/core';
import { User } from "../shared/interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    get userDetails(): User {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    set userDetails(value: User) {
        sessionStorage.setItem("user", JSON.stringify(value));
    }
}
