import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  public getCourseDetails(courseId) {
    const url = '/assets/json/courseDetails.json';
    return this.http.get(url);
  }
}
