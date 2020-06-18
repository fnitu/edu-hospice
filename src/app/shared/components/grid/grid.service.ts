import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  /**
   * Get grid data
   * @param url
   */
  getData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
