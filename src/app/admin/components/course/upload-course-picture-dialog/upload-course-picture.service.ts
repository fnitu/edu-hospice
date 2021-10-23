import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadCoursePictureService {

  constructor(private http: HttpClient) {
  }

  public getImages(url): Observable<any> {
    return this.http.get(url);
  }

  public resetUploadedData(url, fileName): Observable<any> {
    return this.http.delete(url, {
      params: new HttpParams().set('fileName', fileName)
    });
  }
}
