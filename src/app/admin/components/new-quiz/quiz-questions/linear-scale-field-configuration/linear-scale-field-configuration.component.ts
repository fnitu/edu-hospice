import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { Options } from "@angular-slider/ngx-slider";
import { SnackBarComponent } from "../../../../../shared/components/snack-bar/snack-bar.component";
import { GLOBALS } from "../../../../../shared/core/globals";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomTranslateService } from "../../../../../shared/services/custom-translate/custom-translate.service";
import { QuestionInterface } from "../question.interface";

@Component({
  selector: 'app-linear-scale-field-configuration',
  templateUrl: './linear-scale-field-configuration.component.html',
  styleUrls: ['./linear-scale-field-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinearScaleFieldConfigurationComponent implements OnInit {
  @Input() question: QuestionInterface;

  private readonly LINEAR_SCALE_DEFAULT_MIN_VALUE: number = 0;
  private readonly LINEAR_SCALE_DEFAULT_MAX_VALUE: number = 10;

  public linearScaleMinValue: FormControl = new FormControl(this.LINEAR_SCALE_DEFAULT_MIN_VALUE, [
    // https://stackoverflow.com/a/45952838
    (control: AbstractControl) => Validators.max(this.linearScaleMaxValue?.value ?? this.LINEAR_SCALE_DEFAULT_MAX_VALUE)(control)
  ]);

  public linearScaleMaxValue: FormControl = new FormControl(this.LINEAR_SCALE_DEFAULT_MAX_VALUE, [
    // https://stackoverflow.com/a/45952838
    (control: AbstractControl) => Validators.min(this.linearScaleMinValue?.value ?? this.LINEAR_SCALE_DEFAULT_MIN_VALUE)(control)
  ]);

  public linearScaleOptions: Options;

  constructor(private matSnackBar: MatSnackBar,
              private customTranslateService: CustomTranslateService) { }

  ngOnInit(): void {
    this.linearScaleOptions = this.getLinearScaleOptions();

    this.updateQuestionSettings(this.LINEAR_SCALE_DEFAULT_MIN_VALUE, this.LINEAR_SCALE_DEFAULT_MAX_VALUE);

    this.updateFieldsValidation();
  }

  public applyLinearScaleConfig() {
    const hasMinValue = typeof this.linearScaleMinValue.value !== "undefined" && this.linearScaleMinValue.value !== null;
    const hasMaxValue = typeof this.linearScaleMaxValue.value !== "undefined" && this.linearScaleMaxValue.value !== null;

    if (hasMinValue && hasMaxValue && !this.linearScaleMinValue.invalid && !this.linearScaleMaxValue.invalid) {
      // Due to change detection rules in Angular, we need to re-create the options object to apply the change
      const newOptions: Options = Object.assign({}, this.linearScaleOptions);
      newOptions.floor = this.linearScaleMinValue.value;
      newOptions.ceil = this.linearScaleMaxValue.value;

      this.linearScaleOptions = newOptions;

      this.updateQuestionSettings(this.linearScaleMinValue.value, this.linearScaleMaxValue.value)
    } else {
      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: this.customTranslateService.getTranslation("admin.quiz.question.linearConfigWarningMessage"),
          type: GLOBALS.NOTIFICATIONS.ERROR
        }
      });
    }
  }

  private updateQuestionSettings(min, max) {
    this.question.settings = {
      minValue: min,
      maxValue: max
    }
  }

  private getLinearScaleOptions(): Options {
    return {
      floor: this.LINEAR_SCALE_DEFAULT_MIN_VALUE,
      ceil: this.LINEAR_SCALE_DEFAULT_MAX_VALUE,
      showTicks: true,
      showTicksValues: true,
      disabled: true
    }
  }

  private updateFieldsValidation() {
    this.linearScaleMinValue.valueChanges.subscribe(value => {
      if (value < this.linearScaleMaxValue.value) {
        this.linearScaleMaxValue.setErrors(null);
      }
    });

    this.linearScaleMaxValue.valueChanges.subscribe(value => {
      if (value > this.linearScaleMinValue.value) {
        this.linearScaleMinValue.setErrors(null);
      }
    });
  }
}
