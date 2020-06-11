import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AgGridModule } from "ag-grid-angular";


@NgModule({
  declarations: [AdminComponent, CourseListComponent],
    imports: [
        SharedModule,
        AdminRoutingModule,
        AgGridModule.withComponents([])
    ]
})
export class AdminModule { }
