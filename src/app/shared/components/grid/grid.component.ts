import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from './grid.service';
import {GridPropertiesInterface} from './grid-properties.interface';
import {RowActionsCellRendererComponent} from './row-actions-cell-renderer/row-actions-cell-renderer.component';
import {GridActionsInterface} from './grid-actions.interface';

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
  public actions: GridActionsInterface;

  constructor(private gridService: GridService) {
  }

  ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.gridColumns,
      ...this.getDefaultGridOptions()
    };

    this.getActions();
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

      rowHeight: 50,

      //columns
      suppressMovableColumns: true,

      //menus
      suppressContextMenu: true,
      suppressMenuHide: true,

      paginationPageSize: 20,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 0,
      maxBlocksInCache: 2,
      blockLoadDebounceMillis: 200,

      //filtering
      floatingFilter: false,

      onGridReady: (params) => this.onGridReadyHandler(params),

      suppressCellSelection: true,

      frameworkComponents: {
        rowActionsCellRenderer: RowActionsCellRendererComponent
      }
    };
  }

  /**
   * On grid ready handler
   * @param params
   */
  public onGridReadyHandler(params) {
    this.gridService.getData(this.gridProperties.url).subscribe((response: []) => {
      params.api.setRowData(response);
    });
  }

  public refreshGrid() {
    // this.gridOptions.api.getModel().rootNode.childrenCache.setVirtualRowCount(0);
    this.gridOptions.api.purgeServerSideCache([this.gridProperties.url]);
  }

  public getActions() {
    this.gridService.getActions(this.gridProperties.actionsUrl).subscribe((response) => {
      const actions = response?.actions ? response.actions : [];
      this.actions = this.gridService.mergeActionsConfig(actions, this.gridProperties.actions);
    });
  }

}
