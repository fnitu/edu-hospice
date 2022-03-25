import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType } from "@ngx-formly/material/form-field";

@Component({
  selector: 'app-linear-scale-formly-field',
  templateUrl: './linear-scale-formly-field.component.html',
  styleUrls: ['./linear-scale-formly-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinearScaleFormlyFieldComponent extends FieldType implements OnInit {
  public linearScaleValue;

  //FIXME this configuration should take into consideration the server settings
  public linearScaleOptions = {
    floor: 0,
    ceil: 10,
    showTicks: true,
    showTicksValues: true
  };

  constructor() {
    super();
  }

  valueChangeHandler = (value) => {};

  ngOnInit(): void {
  }
}
