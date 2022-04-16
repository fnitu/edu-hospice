import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { QuestionOptionInterface } from "../question-option.interface";
import { CustomTranslateService } from "../../../../../shared/services/custom-translate/custom-translate.service";
import { QuizSettingsService } from "../../quiz-settings/quiz-settings.service";
import { QUIZ_TYPE } from "../../quiz-settings/quiz-settings.component";

@Injectable({
  providedIn: 'root'
})
export class OptionsFieldConfigurationService {

  constructor(private customTranslateService: CustomTranslateService,
              private quizSettingsService: QuizSettingsService) { }

  public resetOptionsValidState(question) {
    _.each(question.options, (option) => {
      option.valid = false;
    });
  }

  public getDefaultOptionModel(valid: boolean = false): QuestionOptionInterface {
    return {
      option: this.customTranslateService.getTranslation('admin.quiz.question.newOption'),
      ...(this.quizSettingsService.quizType !== QUIZ_TYPE.FEEDBACK_QUIZ && {valid: valid})
    }
  }
}
