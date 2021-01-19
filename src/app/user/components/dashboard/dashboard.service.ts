import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

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

    public fetchCourseTabs(): Observable<Object>{
        const url = '/assets/json/courseTabs.json'
        
        return this.http.get(url)
    }
}
