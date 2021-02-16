import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  public getCourseDetails(courseId): Observable<any> {
    const url = './assets/json/courseDetails.json';

    return this.http.get(url);
  }

  public fetchCourseStructure(courseIdTudor): Observable<any>{
    const url = '/assets/json/courseStructureTudor.json'
    
    return this.http.get(url);
}
}

