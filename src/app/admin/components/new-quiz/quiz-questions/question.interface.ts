import { QuestionOptionInterface } from "./question-option.interface";

interface TextAreaSettings {
    maxLength: number;
}

interface LinearScaleSettings {
    minValue: number;
    maxValue: number;
}

interface RadioSettings {
    display: RadioSettingsDisplay;
}

export interface QuestionInterface {
    id?: number;
    name: string;
    type: "RADIO" | "SELECT" | "CHECKBOXES" | "TEXTAREA_SHORT" | "TEXTAREA_BIG" |"LINEAR_SCALE";
    options: QuestionOptionInterface[];
    settings?: TextAreaSettings | LinearScaleSettings | RadioSettings;
}

export type RadioSettingsDisplay = 'vertical' | 'horizontal';
