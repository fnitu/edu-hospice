import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridPropertiesInterface } from "../../../shared/components/grid/grid-properties.interface";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
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
                headerName: 'Denumire curs',
                field: 'name'
            },
            {
                headerName: 'Data inceput',
                field: 'start-date'
            },
            {
                headerName: 'Status curs',
                field: 'status'
            },
            {
                headerName: 'Nr. înscrieri',
                field: 'subscriptions'
            }
        ]
    }

    private static getGridProperties(): GridPropertiesInterface {
        return {
            url: './assets/json/courseList.json'
        }
    }
}
