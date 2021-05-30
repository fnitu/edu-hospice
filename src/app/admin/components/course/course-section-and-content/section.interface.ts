import {ContentInterface} from './content.interface';

export interface SectionInterface {
  id?: number,
  name: string,
  visible: boolean,
  adminContentDetails: ContentInterface[]
}
