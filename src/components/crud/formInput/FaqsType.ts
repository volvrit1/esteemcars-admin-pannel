import { FormField } from "../../../hooks/types";

export const FaqsType: FormField[] = [
  {
    name: "question",
    type: "text",
    required: true,
    label: "Question",
    placeholder: "Enter question",
    widthFull: true,
  },
  {
    name: "answer",
    type: "text",
    required: true,
    label: "Answer",
    placeholder: "Enter answer",
    widthFull: true,
  },
];
