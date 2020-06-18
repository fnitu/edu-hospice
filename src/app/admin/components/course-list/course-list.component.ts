import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridPropertiesInterface } from "../../../shared/components/grid/grid-properties.interface";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: [
        './course-list.component.scss',
        '../../../../../node_modules/ag-grid-community/dist/styles/ag-grid.css',
        '../../../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'],
    encapsulation: ViewEncapsulation.None
})
export class CourseListComponent implements OnInit {
    public gridProperties: GridPropertiesInterface;
    public gridColumns;

    constructor() {
    }

    ngOnInit(): void {
        this.gridColumns = CourseListComponent.getGridColumns();

        this.gridProperties = CourseListComponent.getGridProperties();
    }

    private static getGridColumns() {
        return [
            {
                headerName: 'Course name',
                field: 'name'
            }
        ]
    }

    private static getGridProperties(): GridPropertiesInterface {
        return {
            url: '/assets/json/courseList.json'
        }
    }
}
