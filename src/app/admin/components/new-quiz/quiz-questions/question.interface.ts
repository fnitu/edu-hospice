import { QuestionOptionInterface } from "./question-option.interface";

export interface QuestionInterface {
    id?: number;
    name: string;
    type: "radio" | "select" | "checkboxes";
    options: QuestionOptionInterface[]
}
