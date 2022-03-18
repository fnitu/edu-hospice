import { TypeOption } from "@ngx-formly/core/lib/services/formly.config";
import { LinearScaleFormlyFieldComponent } from "./linear-scale-formly-field.component";

export const linearScaleFormlyFieldExtension: TypeOption = {
    name: 'linearScale',
    component: LinearScaleFormlyFieldComponent,
    wrappers: ['form-field']
}
