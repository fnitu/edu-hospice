import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GLOBALS } from '../../core/globals';

import {User} from '../../interfaces/user'
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private _userDetails: Promise<User>;

    private _userDetailsResponse: Subject<User>;

    constructor(private http:HttpClient){

        this._userDetailsResponse = new Subject<User>();
    }  

    public get userDetails(){
        if (!this._userDetailsResponse.observers.length){
            this.http.get(GLOBALS.DATA_URL.USER_DETAILS).subscribe(this._userDetailsResponse);
        }

        this._userDetails = <Promise<User>> this._userDetailsResponse.toPromise();
        return this._userDetails;
    }

    get accessToken(): string {
        return sessionStorage.getItem("token");
    }

    set accessToken(value: string) {
        sessionStorage.setItem("token", value);
    }

    
    public isAuthenticated(): boolean {
        return !!this.accessToken;
    }
}
