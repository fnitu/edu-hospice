import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FieldType } from "@ngx-formly/material/form-field";
import { LinearScaleFormlyFieldValueAccessor } from "./linear-scale-formly-field-value-accessor";

@Component({
  selector: 'app-linear-scale-formly-field',
  templateUrl: './linear-scale-formly-field.component.html',
  styleUrls: ['./linear-scale-formly-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinearScaleFormlyFieldComponent extends FieldType implements OnInit {
  @ViewChild(LinearScaleFormlyFieldValueAccessor) linearScaleFormlyFieldValueAccessor: LinearScaleFormlyFieldValueAccessor;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
