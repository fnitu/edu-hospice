import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceholderFormatService } from '../../../shared/services/format/placeholder-format.service';
import { GLOBALS } from '../../../shared/core/globals';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private placeholderFormatService: PlaceholderFormatService
  ) {}

  public getTreeJsonData(userId, courseId): Observable<any> {
    const url = this.placeholderFormatService.stringFormat(
      GLOBALS.DATA_URL.COURSE_DETAILS,
      {
        '{userId}': userId,
        '{courseId}': courseId,
      }
    );

    return this.http.get(url);
  }
}
