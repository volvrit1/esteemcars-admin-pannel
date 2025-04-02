import { countries } from "../../../data/data";
import { getSelectFormattedData, formatDate } from "../../../hooks/general";
import { includes } from "../../../hooks/polyfills";
import { FormField } from "../../../hooks/types";

export const CallBackFormType: FormField[] = [
  {
    name: "firstName",
    type: "text",
    required: true,
    label: "First Name",
    placeholder: "Enter first name",
  },
  {
    name: "middleName",
    type: "text",
    required: false,
    label: "Middle Name",
    placeholder: "Enter middle name",
  },
  {
    name: "lastName",
    type: "text",
    required: true,
    label: "Last Name",
    placeholder: "Enter last name",
  },
  {
    name: "title",
    type: "text",
    required: false,
    label: "Title",
    placeholder: "Enter title",
  },
  {
    name: "dob",
    type: "date",
    required: true,
    label: "Date of Birth",
    placeholder: "Select date of birth",
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
    type: "text",
    required: true,
    label: "Phone Number",
    placeholder: "Enter phone number",
  },
  {
    name: "leadNumber",
    type: "text",
    required: false,
    label: "Lead Number",
    placeholder: "Enter lead number",
  },
  {
    name: "userType",
    type: "text",
    required: true,
    label: "User Type",
    placeholder: "Enter user type",
  },
  {
    name: "status",
    type: "select",
    required: false,
    label: "Status",
    options: [
      { value: "Approved", label: "Approved" },
      { value: "Disapproved", label: "Disapproved" },
      { value: "Pending", label: "Pending" },
      { value: "In Progress", label: "In Progress" },
    ],
  },
];
