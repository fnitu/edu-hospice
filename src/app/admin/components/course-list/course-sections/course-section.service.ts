import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GLOBALS } from 'src/app/shared/core/globals';
import { PlaceholderFormatService } from 'src/app/shared/services/format/placeholder-format.service';

@Injectable({ providedIn: 'root' })
export class CourseSectionService {
  public courseTitle = new BehaviorSubject('');
  constructor(
    private http: HttpClient,
    private placeHolderFormatService: PlaceholderFormatService
  ) {}

  public getSections(courseId): Observable<any> {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.ADMIN_COURSE_SECTIONS,
      {
        '{courseId}': courseId,
      }
    );
    return this.http.get(url);
  }
}
