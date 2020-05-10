import {SafeResourceUrl} from '@angular/platform-browser';

export interface Resource {
  'id': number;
  'name': string;
  'url': string;
  'safeUrl': SafeResourceUrl;
}
