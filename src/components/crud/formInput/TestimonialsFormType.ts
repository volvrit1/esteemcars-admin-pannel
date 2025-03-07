import { FormField } from "../../../hooks/types";

export const TestimonialsType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    placeholder: "Enter name",
  },
  {
    name: "review",
    type: "text",
    required: true,
    label: "Review",
    placeholder: "Enter review",
  },
  {
    name: "rating",
    type: "number",
    required: true,
    label: "Rating",
    max:5,
    placeholder: "Enter rating star in number",
  },
  {
    name: "image",
    type: "file",
    required: true,
    label: "Image",
    placeholder: "",
    widthFull:true
  },
];
