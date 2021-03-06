import { Chapter } from './chapter';

export interface Course {
  'description': string;
  'hours': number;
  'id': number;
  'image': string;
  'name': string;
  'shortDescription': string;
  'startDate': string;
  'progress': number;
  'chapters': Array<Chapter>;
  'courseType': string;
}
