"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ProductUOMType } from "../formInput/productFromType";
import { endpoints } from "../../../data/endpoints";
import { Put, Post, Fetch } from "../../../hooks/apiUtils";
import { populateFormFields, populateFormData } from "../../../hooks/general";
import DynamicForm from "../../common/DynamicForm";

interface DealerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const UOMForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const formField = data?.id
    ? populateFormFields(ProductUOMType, data)
    : ProductUOMType;

  const [formData, setFormData] = useState<any>(
    data?.id ? populateFormData(ProductUOMType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?.id) url = `${endpoints[formType].update}${data?.id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      const response: any = data?.id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
      return toast.error("Something went wrong!");
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <DynamicForm
        returnAs="object"
        fields={formField}
        formData={formData}
        submitting={submitting}
        onClose={props?.onClose}
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default UOMForm;
