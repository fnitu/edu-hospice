import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';


@NgModule({
  declarations: [AdminComponent, CourseListComponent],
    imports: [
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
