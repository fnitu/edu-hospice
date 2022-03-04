import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GLOBALS } from "../../../../../shared/core/globals";
import { QuestionInterface } from "../question.interface";
import { CustomTranslateService } from "../../../../../shared/services/custom-translate/custom-translate.service";

@Component({
  selector: 'app-textarea-field-configuration',
  templateUrl: './textarea-field-configuration.component.html',
  styleUrls: ['./textarea-field-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextareaFieldConfigurationComponent implements OnInit {
  @Input() question: QuestionInterface;

  public label: string;
  public limit: number;

  public readonly TEXTAREA_MAX_ROWS = GLOBALS.TEXTAREA.MAX_ROWS;
  public readonly TEXTAREA_MIN_ROWS = GLOBALS.TEXTAREA.MIN_ROWS;

  private readonly TEXTAREA_SHORT_LIMIT = GLOBALS.TEXTAREA.SHORT_LIMIT;
  private readonly TEXTAREA_BIG_LIMIT = GLOBALS.TEXTAREA.BIG_LIMIT;

  constructor(private customTranslateService: CustomTranslateService) { }

  ngOnInit(): void {
    this.label = this.getFieldLabel();
    this.limit = this.getFieldLimit();

    this.updateQuestionSettings();
  }

  private getFieldLabel(): string {
    let label = "";
    switch (this.question.type) {
      case GLOBALS.FIELD_TYPES.TEXTAREA_SHORT:
        label = this.customTranslateService.getTranslation('admin.quiz.question.textareaShortLabel');
        break;
      case GLOBALS.FIELD_TYPES.TEXTAREA_BIG:
        label = this.customTranslateService.getTranslation('admin.quiz.question.textareaBigLabel');
        break;
    }

    return label;
  }

  private getFieldLimit(): number {
    let limit;

    switch (this.question.type) {
      case GLOBALS.FIELD_TYPES.TEXTAREA_SHORT:
        limit = this.TEXTAREA_SHORT_LIMIT;
        break;
      case GLOBALS.FIELD_TYPES.TEXTAREA_BIG:
        limit = this.TEXTAREA_BIG_LIMIT;
        break;
    }

    return limit;
  }

  public updateQuestionSettings() {
    this.question.settings = {
      maxLength: this.limit
    }
  }

}
