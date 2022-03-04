import { QuestionOptionInterface } from "./question-option.interface";

export interface QuestionInterface {
    id?: number;
    name: string;
    type: "RADIO" | "SELECT" | "CHECKBOXES" | "TEXTAREA_SHORT" | "TEXTAREA_BIG" |"LINEAR_SCALE";
    options: QuestionOptionInterface[];
    settings?: TextAreaSettings | LinearScaleSettings;
}

interface TextAreaSettings {
    maxLength: number;
}

interface LinearScaleSettings {
    minValue: number;
    maxValue: number;
}
