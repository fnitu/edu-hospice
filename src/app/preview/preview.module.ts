import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    PreviewComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    PreviewRoutingModule
  ]
})

export class PreviewModule { }
