export interface CourseInterface {
    'description': string;
    'hours': number;
    'id': number;
    'image': string;
    'name': string;
    'shortDescription': string;
    'startDate': string;
    'progress': number;
    'courseType': string;
    'sections': any[]
}

export interface CourseTreeNodeInterface {
    name: string;
    id: number;
    url?: string
    children?: CourseTreeNodeInterface[]
}
