import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderFormatService {

  constructor() {
  }

  stringFormat(value: string, replacements): string {

    if (value) {
      value = value.replace(/\{[a-zA-Z0-9_\-]+\}/g, (param) => {
        return !_.isUndefined(replacements[param]) ? replacements[param]: param ;
      });
    }

    return value;
  }
}
