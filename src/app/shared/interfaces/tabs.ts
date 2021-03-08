export interface Tabs {
  name: string;
  link: string;
  type: string;
  courseList: Array<CourseList>;
}

interface CourseList {
  hours: number;
  id: number;
  name: string;
  progress: number;
  shortDescription: string;
  startDate: Date;
  status: string;
}
