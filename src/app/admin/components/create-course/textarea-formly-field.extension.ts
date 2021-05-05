import { GLOBALS } from '../../../shared/core/globals';
import { TypeOption } from '@ngx-formly/core/lib/services/formly.config';

export const textareaFormlyFieldExtension: TypeOption = {
  name: 'textareafield',
  extends: 'textarea',
  defaultOptions: {
    templateOptions: {
      autosizeMaxRows: GLOBALS.TEXTAREA.MAX_ROWS, //5
      autosizeMinRows: GLOBALS.TEXTAREA.MIN_ROWS, //2
      autosize: true,
    },
    expressionProperties: {
      'templateOptions.description': (model, formState, field) => {
        let description = '';

        if (field.templateOptions.maxLength) {
          const length = field.formControl.value
            ? field.formControl.value.length
            : 0;

          description = `${length} / ${field.templateOptions.maxLength}`;
        }

        return description;
      },
    },
  },
};
