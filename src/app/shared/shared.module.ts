import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialElevationDirective } from './core/material-elevation.directive';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { HttpConfigService } from './services/http-interceptors/http-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { GlobalMatFormFieldConfig } from './constants/global-mat-form-field-config';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { GlobalMatSnackBarConfig } from './constants/global-mat-snack-bar-config';


@NgModule({
    declarations: [
        MaterialElevationDirective,
        CourseCardComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatChipsModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatListModule,
        MatSnackBarModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        NgProgressModule,
        NgProgressHttpModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatChipsModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatListModule,
        MatSnackBarModule,
        CourseCardComponent,
        TranslateModule
  ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpConfigService,
                    multi: true
                },
              {
                provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                useValue: GlobalMatFormFieldConfig
              },
              {
                provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
                useValue: GlobalMatSnackBarConfig
              }
            ]
        }
    }
}
