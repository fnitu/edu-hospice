import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) {
  }

  public getCourses() {
    const url = '/assets/json/homeCourses.json';
    return this.http.get(url);
  }
}
