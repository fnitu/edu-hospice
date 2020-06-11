import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CourseListComponent implements OnInit {
    public gridOptions;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.gridOptions = _.merge({
            columnDefs: this.getGridColumns()
        }, this.getDefaultGridOptions());
    }

    private getDefaultGridOptions() {
        return {
            defaultColDef: {
                sortable: true,
                filter: false,
                suppressMenu: true,
                unSortIcon: true,
                menuTabs: [],
                minWidth: 200
            },

            //columns
            suppressMovableColumns: true,

            //menus
            suppressContextMenu: true,
            suppressMenuHide: true,

            rowModelType: 'infinite',
            paginationPageSize: 20,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 1,
            infiniteInitialRowCount: 0,
            maxBlocksInCache: 2,
            blockLoadDebounceMillis: 200,

            //filtering
            floatingFilter: false,

            onGridReady: (params) => this.onGridReadyHandler(params)
        }
    }

    public onGridReadyHandler(params) {
        const dataSource = {
            rowCount: null,
            getRows:  (getRowsParams) =>this.getRowsHandler (getRowsParams)
        }

        this.gridOptions.api.setDatasource(dataSource);
    }

    private getRowsHandler(params) {
        this.http.get("/assets/json/courseList.json").subscribe((response: []) => {
            var rowsThisPage = response.slice(params.startRow, params.endRow);
            // if on or after the last page, work out the last row.
            var lastRow = -1;
            if (response.length <= params.endRow) {
                lastRow = response.length;
            }
            // call the success callback
            params.successCallback(rowsThisPage, lastRow);

        });
    }

    private getGridColumns() {
        return [
            {
                headerName: 'Course name',
                field: 'name'
            }
        ]
    }

}
