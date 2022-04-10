import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType } from "@ngx-formly/material/form-field";
import { GLOBALS } from "../../../core/globals";

@Component({
  selector: 'app-linear-scale-formly-field',
  templateUrl: './linear-scale-formly-field.component.html',
  styleUrls: ['./linear-scale-formly-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinearScaleFormlyFieldComponent extends FieldType implements OnInit {
  public linearScaleValue;

  public linearScaleOptions = {
    showTicks: true,
    showTicksValues: true
  };

  constructor() {
    super();
  }

  valueChangeHandler = (value) => {};

  ngOnInit(): void {
    this.linearScaleOptions['floor'] = this.field.templateOptions.additionalProperties?.minValue ?? GLOBALS.LINEAR_SCALE.DEFAULT_MIN_VALUE
    this.linearScaleOptions['ceil'] = this.field.templateOptions.additionalProperties?.maxValue ?? GLOBALS.LINEAR_SCALE.DEFAULT_MAX_VALUE
  }
}
