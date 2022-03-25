import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive } from "@angular/core";
import { LinearScaleFormlyFieldComponent } from "./linear-scale-formly-field.component";

@Directive({
    selector: '.linear-scale-field',
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: LinearScaleFormlyFieldValueAccessor,
                multi: true
            }
        ]
})
export class LinearScaleFormlyFieldValueAccessor implements ControlValueAccessor {

    constructor(private _host: LinearScaleFormlyFieldComponent) {
    }

    registerOnChange(fn: any): void {
        this._host.valueChangeHandler = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(value: any): void {
        this._host.linearScaleValue = value;
    }
}
