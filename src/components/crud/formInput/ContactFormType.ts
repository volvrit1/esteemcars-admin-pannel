import { countries, bankNames } from "../../../data/data";
import { getSelectFormattedData } from "../../../hooks/general";
import { includes } from "../../../hooks/polyfills";
import { FormField } from "../../../hooks/types";

export const ContactType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    placeholder: "Enter name",
  },
  {
    name: "email",
    type: "email",
    required: true,
    label: "Email",
    placeholder: "Enter email",
  },
  {
    name: "phone",
    type: "number",
    required: true,
    label: "Phone Number",
    placeholder: "Enter phone number",
  },
  {
    name: "source",
    type: "text",
    required: false,
    label: "Source",
    placeholder: "Enter source",
  },
];
