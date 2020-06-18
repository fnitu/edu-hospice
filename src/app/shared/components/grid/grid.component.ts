import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GridService } from "./grid.service";
import { GridPropertiesInterface } from "./grid-properties.interface";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  @Input() gridColumns;
  @Input() gridProperties: GridPropertiesInterface;

  public gridOptions;

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.gridColumns,
      ...this.getDefaultGridOptions()
    }

  }

  /**
   * Define the default options
   */
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

  /**
   * On grid ready handler
   * @param params
   */
  public onGridReadyHandler(params) {
    const dataSource = {
      rowCount: null,
      getRows:  (getRowsParams) =>this.getRowsHandler (getRowsParams)
    }

    this.gridOptions.api.setDatasource(dataSource);
  }

  /**
   * Get rows handler that makes the http request
   * @param params
   */
  private getRowsHandler(params) {
    this.gridService.getData(this.gridProperties.url).subscribe((response: []) => {
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

}
