export interface CourseInterface {
    'id': number;
    'name': string;
    'progress': number;
    'userSectionSummary': any[]
}

export interface CourseTreeNodeInterface {
    name: string;
    id: number;
    url?: string
    children?: CourseTreeNodeInterface[]
}
