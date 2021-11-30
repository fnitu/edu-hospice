import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { QuestionInterface } from "../../../admin/components/new-quiz/quiz-questions/question.interface";
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

  public quizDetails = null;
  public quizQuestions: QuestionInterface[] = [];

  public quizForm = new FormGroup({});
  public quizFields: FormlyFieldConfig[];
  public quizModel = {};

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuizDetails()
  }

  private getQuizDetails() {
    this.quizService.getQuizDetails(this.quizDetailsUrl).subscribe((response) => {
      this.quizDetails = response;

      this.quizService.getQuizQuestions(this.quizQuestionsUrl).subscribe((response) => {
        this.quizQuestions = response;

        this.quizFields = this.generateQuizFields(this.quizQuestions);
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

    console.log(fields);

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
          }
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
        fieldConfig = {
          type: "textarea"
        };
        break;
      case GLOBALS.FIELD_TYPES.TEXTAREA_BIG:
        fieldConfig = {
          type: "textarea"
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

}
