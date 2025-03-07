"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ProductCategoryType } from "../formInput/productFromType";
import { endpoints } from "../../../data/endpoints";
import { Fetch, Put, Post } from "../../../hooks/apiUtils";
import {
  populateFormFields,
  populateFormData,
  getSelectFormattedData,
} from "../../../hooks/general";
import DynamicForm from "../../common/DynamicForm";

interface DealerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const CategoryForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?.id
      ? populateFormFields(ProductCategoryType, data)
      : ProductCategoryType
  );
  const [formData, setFormData] = useState<any>(
    data?.id ? populateFormData(ProductCategoryType, data) : {}
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response: any = await Fetch(
          "/api/product-category/public",
          {},
          5000,
          true,
          false
        );
        if (response.success && response?.data?.length > 0) {
          const selectData = getSelectFormattedData(response.data);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "parentCategory")
              return { ...obj, options: selectData };
            return obj;
          });
          setFormFields(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
    // eslint-disable-next-line
  }, []);

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
      {!loading && (
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default CategoryForm;
