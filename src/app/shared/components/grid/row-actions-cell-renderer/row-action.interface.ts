export interface RowActionInterface {
    label: string;
    icon: string;
    cls?: string;
    handler(params: any): void;
}
