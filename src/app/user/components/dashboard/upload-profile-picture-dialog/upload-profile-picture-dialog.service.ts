import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadProfilePictureDialogService {

  constructor(private http: HttpClient) { }

  public resetUploadedData(url, fileName): Observable<any> {
    return this.http.delete(url, {
      params: new HttpParams().set('fileName', fileName)
    });
  }
}
