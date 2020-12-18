import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [AdminComponent, CourseListComponent, DashboardComponent],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
