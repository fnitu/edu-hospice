import {Resource} from './resource';
import {SafeResourceUrl} from '@angular/platform-browser';

export interface Chapter {

  'id': number;
  'name': string;
  'resources': Array<Resource>;
  'type': string;
  'url': string;
  'safeUrl': SafeResourceUrl;
  'expanded': boolean;
  'disabled': boolean;
}
