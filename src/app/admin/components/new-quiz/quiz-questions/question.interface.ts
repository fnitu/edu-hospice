import { QuestionOptionInterface } from "./question-option.interface";

export interface QuestionInterface {
    id?: number;
    name: string;
    type: "RADIO" | "SELECT" | "CHECKBOXES";
    options: QuestionOptionInterface[]
}
