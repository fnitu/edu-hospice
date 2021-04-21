export enum CourseRole {
  MEDICAL = 'MEDICAL',
  MULTI_DISCIPLINARY = 'MULTI_DISCIPLINARY',
}

export enum CourseState {
  UNPUBLISHED = 'UNPUBLISHED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
}

export enum CourseType {
  ALWAYS_ON = 'ALWAYS_ON',
  WITH_LIVE_SESSIONS = 'WITH_LIVE_SESSIONS',
}

export enum Currency {
  EUR = 'EUR',
  RON = 'RON',
}

export interface CreateCourse {
  accessDays: 0;
  authors: 'string';
  courseRole: CourseRole;
  courseState: CourseState;
  courseType: CourseType;
  credits: 0;
  currency: Currency;
  description: 'string';
  endDate: 'string';
  hours: 0;
  image: 'string';
  name: 'string';
  price: 0;
  shortDescription: 'string';
  startDate: 'string';
}
