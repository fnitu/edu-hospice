import { ResourceTudor } from './resourceTudor'
import { SafeResourceUrl } from '@angular/platform-browser';

export interface SectionTudor {

    'id': number;
    'name': string;
    'resources': Array<ResourceTudor>;
    'type': string;
    'url': string;
    'safeUrl': SafeResourceUrl;
    'expanded': boolean;
    'disabled': boolean;
  }