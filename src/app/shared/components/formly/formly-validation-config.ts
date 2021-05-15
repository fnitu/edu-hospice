import { CustomTranslateService } from '../../services/custom-translate/custom-translate.service';
import { FormControl, ValidationErrors } from '@angular/forms';

export function formlyValidationConfig(
  customTranslateService: CustomTranslateService
) {
  return {
    validators: [
      { name: 'email', validation: EmailValidator },
      { name: 'multiRequired', validation: MultiRequiredValidator },
    ],
    validationMessages: [
      {
        name: 'required',
        message: customTranslateService.getTranslation('field.required'),
      },
      {
        name: 'multiRequired',
        message: customTranslateService.getTranslation('field.required'),
      },
      {
        name: 'checkboxDependency',
        message: customTranslateService.getTranslation('field.profession'),
      },
      {
        name: 'email',
        message: customTranslateService.getTranslation('field.email'),
      },
      {
        name: 'min',
        message: (err, field) => {
          return `${customTranslateService.getTranslation('field.min')} ${
            field.templateOptions.min
          }`;
        },
      },
      {
        name: 'max',
        message: (err, field) => {
          return `${customTranslateService.getTranslation('field.max')} ${
            field.templateOptions.max
          }`;
        },
      },
    ],
  };
}

export function EmailValidator(control: FormControl): ValidationErrors {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(control.value)
    ? null
    : { email: true };
}

export function MultiRequiredValidator(control: FormControl): ValidationErrors {
  let validation = false;
  for (let key in control.value) {
    if (control.value[key] === true) {
      validation = true;
    }
  }
  if (control.value['other'] && !control.value['profession']) {
    validation = false;
    return { checkboxDependency: true };
  }
  return validation ? null : { status: 'INVALID' };
}
