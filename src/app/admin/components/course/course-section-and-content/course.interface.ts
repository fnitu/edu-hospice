import {SectionInterface} from './section.interface';

export interface CourseInterface {
  id?: number,
  name?: string,
  sectionList?: SectionInterface[],
}
