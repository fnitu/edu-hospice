import { QuestionOptionInterface } from "./question-option.interface";
import { Options } from "@angular-slider/ngx-slider";

export interface QuestionInterface {
    id?: number;
    name: string;
    type: "RADIO" | "SELECT" | "CHECKBOXES" | "TEXTAREA_SHORT" | "TEXTAREA_BIG" |"LINEAR_SCALE";
    options: QuestionOptionInterface[];
    linearScaleOptions?: Options;
}
