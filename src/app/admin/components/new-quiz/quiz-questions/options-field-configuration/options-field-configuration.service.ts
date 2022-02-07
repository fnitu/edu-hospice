import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { QuestionOptionInterface } from "../question-option.interface";
import { CustomTranslateService } from "../../../../../shared/services/custom-translate/custom-translate.service";

@Injectable({
  providedIn: 'root'
})
export class OptionsFieldConfigurationService {

  constructor(private customTranslateService: CustomTranslateService) { }

  public resetOptionsValidState(question) {
    _.each(question.options, (option) => {
      option.valid = false;
    });
  }

  public getDefaultOptionModel(valid: boolean = false): QuestionOptionInterface {
    return {
      option: this.customTranslateService.getTranslation('admin.quiz.question.newOption'),
      valid: valid
    }
  }
}
