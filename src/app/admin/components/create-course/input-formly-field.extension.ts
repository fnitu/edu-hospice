import { TypeOption } from '@ngx-formly/core/lib/services/formly.config';

export const inputFormlyFieldExtension: TypeOption = {
  name: 'inputField',
  extends: 'input',
  defaultOptions: {
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
