import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive } from "@angular/core";

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
    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }

}
