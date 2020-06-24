import { CustomTranslateService } from "../../services/custom-translate/custom-translate.service";

export function formlyValidationConfig(customTranslateService: CustomTranslateService) {
  return {
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
