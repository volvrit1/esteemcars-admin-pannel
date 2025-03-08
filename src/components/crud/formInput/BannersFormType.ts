import { FormField } from "../../../hooks/types";

export const BannersType: FormField[] = [
  {
    name: "title",
    type: "text",
    required: true,
    label: "Title",
    placeholder: "Enter title",
  },
  {
    name: "subtitle",
    type: "text",
    required: true,
    label: "Sub Title",
    placeholder: "Enter sub title",
  },
  {
    name: "slug",
    type: "text",
    required: true,
    label: "Slug",
    max:5,
    placeholder: "Enter slug",
  },
  {
    name: "description",
    type: "textarea",
    required: true,
    label: "Description",
    max:5,
    placeholder: "Enter description",
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
