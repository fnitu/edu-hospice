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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GridComponent } from './components/grid/grid.component';
import { AgGridModule } from "ag-grid-angular";
import { FORMLY_CONFIG, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { formlyValidationConfig } from './components/formly/formly-validation-config';
import { CustomTranslateService } from './services/custom-translate/custom-translate.service';

import * as $ from 'jquery';
import { RowActionsCellRendererComponent } from './components/grid/row-actions-cell-renderer/row-actions-cell-renderer.component';

@NgModule({
    declarations: [
        MaterialElevationDirective,
        CourseCardComponent,
        NotFoundComponent,
        GridComponent,
        RowActionsCellRendererComponent
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
        MatSnackBarModule,
        TranslateModule,
        AgGridModule.withComponents([RowActionsCellRendererComponent]),
        FormlyModule.forRoot(),
        FormlyMaterialModule
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
        TranslateModule,
        GridComponent,
        FormlyModule,
        FormlyMaterialModule
  ],
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
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: formlyValidationConfig,
      deps: [CustomTranslateService]
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: GlobalMatSnackBarConfig
    }
  ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule
        };
    }
}
