import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }


  public getTreeJsonData(courseId): Observable<any>{
    const url = './assets/json/treeJSON.json'

    return this.http.get(url);
  }
}

