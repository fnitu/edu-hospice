import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GLOBALS } from 'src/app/shared/core/globals';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { GridPropertiesInterface } from '../../../shared/components/grid/grid-properties.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit {
  public gridProperties: GridPropertiesInterface;
  public gridColumns;

  constructor(private customTranslateService: CustomTranslateService) {}

  ngOnInit(): void {
    this.gridColumns = this.getGridColumns();
    this.gridProperties = this.getGridProperties();
  }

  private getGridColumns() {
    return [
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.courseName'
        ),
        field: 'name',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.startDate'
        ),
        field: 'startDate',
      },
      {
        headerName: this.customTranslateService.getTranslation(
          'admin.courses.totalRegisteredUsers'
        ),
        field: 'totalRegisteredUsers',
      },
    ];
  }

  private getGridProperties(): GridPropertiesInterface {
    return {
      url: GLOBALS.DATA_URL.ADMIN_COURSES,
    };
  }
}
