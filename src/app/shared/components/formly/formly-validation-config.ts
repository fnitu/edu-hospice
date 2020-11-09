import { CustomTranslateService } from "../../services/custom-translate/custom-translate.service";
import {FormControl, ValidationErrors} from '@angular/forms';



export function formlyValidationConfig(customTranslateService: CustomTranslateService) {
  return {
    validators: [
      { name: 'email', validation: EmailValidator },
    ],
    validationMessages: [
      {
        name: 'required',
        message: customTranslateService.getTranslation('field.required')
      },
      {
        name: 'email',
        message: customTranslateService.getTranslation('field.email')
      }
    ]
  };
}

export function EmailValidator(control: FormControl): ValidationErrors {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(control.value) ? null : { 'email': true };
}
