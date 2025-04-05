import { FormField } from "../../../hooks/types";

export const BannersType: FormField[] = [
  {
    name: "title",
    type: "select",
    required: true,
    label: "Title",
    placeholder: "Select banner title",
    options: [
      { label: "Home", value: "Home" },
      { label: "Contact", value: "Contact Us" },
      { label: "Blog", value: "Blog" },
      { label: "Why", value: "Why" },
      { label: "Solution", value: "Solution" },
    ],
  },
  {
    name: "subtitle",
    type: "text",
    required: true,
    label: "Sub Title",
    placeholder: "Enter sub title",
  },
  {
    name: "mobile",
    type: "choose",
    required: false,
    label: "Mobile Image",
    max: 5,
    placeholder: "Enter mobile",
  },
  {
    name: "description",
    type: "textarea",
    required: true,
    label: "Description",
    max: 5,
    placeholder: "Enter description",
    widthFull: true,
  },

  {
    name: "image",
    type: "file",
    required: true,
    label: "Image",
    placeholder: "",
    widthFull: true,
  },
];
