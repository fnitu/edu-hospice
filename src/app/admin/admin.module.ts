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
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CreateCourseContentComponent } from './components/create-course-content/create-course-content.component';
import { EditCourseContentDialogComponent } from './components/create-course-content/edit-course-content-dialog/edit-course-content-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CourseSectionsComponent } from './components/course-list/course-sections/course-sections.component';
import { EditSectionDialogComponent } from './components/course-list/course-sections/edit-section-dialog/edit-section-dialog.component';
import { CourseEditComponent } from './components/course-list/course-edit/course-edit.component';

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
    CreateCourseComponent,
    CreateCourseContentComponent,
    EditCourseContentDialogComponent,
    EditSectionDialogComponent,
    CourseSectionsComponent,
    CourseEditComponent,
  ],
  imports: [SharedModule, AdminRoutingModule, MatAutocompleteModule],
  providers: [DatePipe],
})
export class AdminModule {}
