import { Injectable } from '@angular/core';
import { GLOBALS } from "./shared/core/globals";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public executeLogout(): Observable<any> {
    const url = `${GLOBALS.BASE_URL}/auth/logout`;

    return this.http.post(url, null);
  }
}
