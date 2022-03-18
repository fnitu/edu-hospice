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

export enum QuestionType {
    RADIO = 'RADIO',
    SELECT = 'SELECT',
    CHECKBOXES = 'CHECKBOXES',
    TEXTAREA_SHORT = 'TEXTAREA_SHORT',
    TEXTAREA_BIG = 'TEXTAREA_BIG',
    LINEAR_SCALE = 'LINEAR_SCALE'
}

export interface QuestionInterface {
    id?: number;
    name: string;
    type: QuestionType;
    options: QuestionOptionInterface[];
    settings?: TextAreaSettings | LinearScaleSettings | RadioSettings;
}

export enum RadioSettingsDisplayType {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}
export type RadioSettingsDisplay = 'vertical' | 'horizontal';

export interface QuestionResponseDataModel {
    [key: number]: number | string | CheckboxResponseDataModel;
}

interface CheckboxResponseDataModel {
    [key: number]: boolean;
}
