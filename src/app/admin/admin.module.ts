import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersComponent } from './components/users/users.component';
import { DatePipe } from '@angular/common';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { QuizSettingsComponent } from './components/new-quiz/quiz-settings/quiz-settings.component';
import { QuizQuestionsComponent } from './components/new-quiz/quiz-questions/quiz-questions.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CourseComponent } from './components/course/course.component';
import { CourseSectionAndContentComponent } from './components/course/course-section-and-content/course-section-and-content.component';
import { EditCourseContentDialogComponent } from './components/course/course-section-and-content/edit-course-content-dialog/edit-course-content-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditSectionDialogComponent } from './components/course/course-section-and-content/edit-section-dialog/edit-section-dialog.component';
import { ManageResourcesDialog } from './components/course/course-section-and-content/manage-resources-dialog/manage-resources-dialog.component';
import { CourseInfoComponent } from './components/course/course-info/course-info.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AdminComponent,
    CourseListComponent,
    DashboardComponent,
    UserListComponent,
    UsersComponent,
    NewQuizComponent,
    QuizSettingsComponent,
    QuizQuestionsComponent,
    QuizListComponent,
    CourseComponent,
    CourseSectionAndContentComponent,
    EditCourseContentDialogComponent,
    EditSectionDialogComponent,
    ManageResourcesDialog,
    CourseInfoComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatAutocompleteModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
  ],
  providers: [DatePipe],
})
export class AdminModule {}
