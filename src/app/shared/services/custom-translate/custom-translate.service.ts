import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  constructor(private translateService: TranslateService) {
  }

  getTranslation(translationKey: string, interpolateParams?: Object): string {
    let translation: string = '';

    this.translateService.get(translationKey, interpolateParams).subscribe((response) => {
      translation = response;
    });

    return translation;
  }
}
