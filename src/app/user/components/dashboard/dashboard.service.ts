import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBALS } from '../../../shared/core/globals';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {


    constructor(private http: HttpClient) {
    }

    public getCourses(): Observable<any> {
        const url = '/assets/json/homeCourses.json';

        return this.http.get(url);
    }

    public getUserDetails() {
      const url = `${GLOBALS.BASE_URL}/users/currentUser`;
      return this.http.get(url);
    }
}
