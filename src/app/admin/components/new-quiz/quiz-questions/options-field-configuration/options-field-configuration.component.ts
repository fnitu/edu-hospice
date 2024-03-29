import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionInterface, RadioSettings, RadioSettingsDisplayType } from "../question.interface";
import { QuestionOptionInterface } from "../question-option.interface";
import * as _ from "lodash";
import { SnackBarComponent } from "../../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../../shared/core/globals";
import { CustomTranslateService } from "../../../../../shared/services/custom-translate/custom-translate.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OptionsFieldConfigurationService } from "./options-field-configuration.service";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { QuizSettingsService } from "../../quiz-settings/quiz-settings.service";
import { QUIZ_TYPE } from "../../quiz-settings/quiz-settings.component";

@Component({
  selector: 'app-options-field-configuration',
  templateUrl: './options-field-configuration.component.html',
  styleUrls: ['./options-field-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OptionsFieldConfigurationComponent implements OnInit {
  @Input() question: QuestionInterface;

  public readonly FIELD_TYPES = GLOBALS.FIELD_TYPES;
  public readonly QUIZ_KNOWLEDGE_TYPE = QUIZ_TYPE.KNOWLEDGE_QUIZ;

  public position: RadioSettingsDisplayType = RadioSettingsDisplayType.VERTICAL;

  constructor(private customTranslateService: CustomTranslateService,
              private matSnackBar: MatSnackBar,
              private optionsFieldConfigurationService: OptionsFieldConfigurationService,
              public quizSettingsService: QuizSettingsService) { }

  ngOnInit(): void {
    if (this.question.type === this.FIELD_TYPES.RADIO) {
      const settings: RadioSettings = this.question.settings as RadioSettings;

      if (settings.display) {
        this.position = settings.display;
      } else {
        this.question.settings = {
          display: this.position
        };
      }
    }
  }

  public addOption(question, option) {
    const currentOptionIndex = question.options.indexOf(option);

    const newOption: QuestionOptionInterface = this.optionsFieldConfigurationService.getDefaultOptionModel();

    question.options.splice(currentOptionIndex + 1, 0, newOption);
  }

  public removeOption(question, option) {
    if (question.options.length > 1) {
      _.remove(question.options, function (item) {
        return item === option;
      });
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation(
              'admin.quiz.question.deleteLastOptionMessage'
          ),
          type: GLOBALS.NOTIFICATIONS.ERROR,
        }
      });
    }
  }

  public validOptionChanged($event, question, option) {
    if (question.type === this.FIELD_TYPES.RADIO || question.type === this.FIELD_TYPES.SELECT) {
      this.optionsFieldConfigurationService.resetOptionsValidState(question);
    }

    option.valid = $event.checked;
  }

  public positionChanged(event: MatButtonToggleChange) {
    this.position = event.value;

    this.question.settings = {
      display: event.value
    };
  }
}
