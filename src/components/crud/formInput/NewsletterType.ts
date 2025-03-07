import { FormField } from "../../../hooks/types";

export const NewsletterType: FormField[] = [
  {
    name: "email",
    type: "email",
    required: true,
    label: "Email",
    placeholder: "Enter email",
    isDisabled: true,
  },
  {
    name: "active",
    type: "choose",
    required: false,
    label: "Active Status",
    placeholder: "",
  },
];
