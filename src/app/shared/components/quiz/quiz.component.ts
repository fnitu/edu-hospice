import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionInterface, QuestionResponseDataModel } from "../../../admin/components/new-quiz/quiz-questions/question.interface";
import { QuizService } from "./quiz.service";
import { FormGroup, Validators } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import * as _ from "lodash";
import { GLOBALS } from "../../core/globals";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {
  @Input() quizDetailsUrl: string;
  @Input() quizQuestionsUrl: string;
  @Input() displayCorrectValues: boolean = false;

  public quizDetails = null;
  public quizQuestions: QuestionInterface[] = [];

  public quizForm = new FormGroup({});
  public quizFields: FormlyFieldConfig[];
  public quizModel: QuestionResponseDataModel = {};

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuizDetails();
  }

  private getQuizDetails() {
    this.quizService.getQuizDetails(this.quizDetailsUrl).subscribe((response) => {
      this.quizDetails = response;

      this.quizService.getQuizQuestions(this.quizQuestionsUrl).subscribe((response) => {
        this.quizQuestions = this.quizService.transformSettingsModel(response);

        this.quizFields = this.generateQuizFields(this.quizQuestions);

        if (this.displayCorrectValues) {
          this.quizModel = this.generateQuizModel();
        }
      });
    });
  }

  private generateQuizFields(serverFields): FormlyFieldConfig[] {
    let fields: FormlyFieldConfig[] = [];

    _.each(serverFields, (field, i) => {
      fields.push(_.merge({
        key: field.id.toString(),
        templateOptions: {
          label: `${i+1}. ${field.name}`,
          required: true
        },
        validators: {
          validation: [Validators.required],
        }
      }, this.getFieldSpecificConfig(field)));
    });

    return fields;
  }

  private getFieldSpecificConfig(field): {} {
    let fieldConfig: {} = {};

    switch (field.type) {
      case GLOBALS.FIELD_TYPES.SELECT:
        fieldConfig = {
          type: "select",
          templateOptions: {
            options: this.transformOptionModel(field.options)
          }
        };
        break;
      case GLOBALS.FIELD_TYPES.RADIO:
        fieldConfig = {
          type: "radio",
          templateOptions: {
            options: this.transformOptionModel(field.options)
          },
          className: `radio-field ${field.settings.display}`
        };
        break;
      case GLOBALS.FIELD_TYPES.CHECKBOXES:
        fieldConfig = {
          type: "multicheckbox",
          templateOptions: {
            options: this.transformOptionModel(field.options)
          }
        };
        break;
      case GLOBALS.FIELD_TYPES.TEXTAREA_SHORT:
      case GLOBALS.FIELD_TYPES.TEXTAREA_BIG:
        fieldConfig = {
          type: "textareafield",
          templateOptions: {
            autosize: true,
            autosizeMinRows: GLOBALS.TEXTAREA.MIN_ROWS,
            autosizeMaxRows: GLOBALS.TEXTAREA.MAX_ROWS,
            maxLength: parseInt(field.settings.maxLength)
          }
        };
        break;
      case GLOBALS.FIELD_TYPES.LINEAR_SCALE:
        fieldConfig = {
          type: "linearScale",
          templateOptions: {
            additionalProperties: {
              minValue: parseInt(field.settings.minValue),
              maxValue: parseInt(field.settings.maxValue)
            }
          }
        };
        break;
    }

    return fieldConfig;
  }

  private transformOptionModel(options) {
    let newModel = [];

    _.each(options, (option) => {
      newModel.push({
          value: option.id,
          label: option.option
      });
    });

    return newModel;
  }

  private generateQuizModel(): QuestionResponseDataModel {
    let model = {};

    for (const field of this.quizQuestions) {
      const fieldType = field.type;

      if (fieldType === GLOBALS.FIELD_TYPES.SELECT || fieldType === GLOBALS.FIELD_TYPES.RADIO || fieldType === GLOBALS.FIELD_TYPES.CHECKBOXES) {
        // get valid options
        const validOptions = field.options.filter(option => option.valid);

        for (const option of validOptions) {
          // store in model the valid options
          // for multi checkboxes the valid options must be stored like { optionId: true }
          if (field.type !== GLOBALS.FIELD_TYPES.CHECKBOXES) {
            model[field.id] = option.id;
          } else {
            const newValidOption = {}
            newValidOption[option.id] = option.valid;

            model[field.id] = {
              ...model[field.id],
              ...newValidOption
            };
          }
        }
      }
    }

    return model;
  }

}
