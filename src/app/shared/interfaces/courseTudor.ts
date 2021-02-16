import { SectionTudor } from './sectionTudor'

export interface CourseTudor {
    'hours': number;
    'id': number;
    'image': string;
    'name': string;
    'shortDescription': string;
    'startDate': string;
    'percentage': number;
    'section'?: Array<SectionTudor>;
    'courseType': string;
  }