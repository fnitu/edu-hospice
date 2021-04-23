import { QuestionOptionInterface } from "./question-option.interface";

export interface QuestionInterface {
    name: string;
    type: "radio" | "select" | "checkboxes";
    options: QuestionOptionInterface[]
}
