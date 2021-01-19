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

    public fetchCourseTabs(): Observable<any>{
        const url = '/assets/json/courseTabs.json'
        
        return this.http.get(url);
    }

    public fetchTabData(url): Observable<any> {
        return this.http.get(url);
    }

    public getUserDetails() {
      const url = `${GLOBALS.BASE_URL}/users/currentUser`;
      return this.http.get(url);
    }
}
