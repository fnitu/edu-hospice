import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';
import { PlaceholderFormatService } from 'src/app/shared/services/format/placeholder-format.service';

@Injectable({ providedIn: 'root' })
export class ManageResourcesDialogService {
  constructor(
    private http: HttpClient,
    private placeHolderFormatService: PlaceholderFormatService
  ) {}

  public addAditionalResource(contentId, data) {
    const url = this.placeHolderFormatService.stringFormat(
      GLOBALS.DATA_URL.CREATE_SECTION_CONTENT_RESOURCES,
      { '{contentId}': contentId }
    );
    return this.http.post(url, data);
  }
}
