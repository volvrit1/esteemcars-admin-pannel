"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DynamicForm from "../common/DynamicForm";
import { ProductFormType } from "./formInput/productFromType";
import { endpoints } from "../../data/endpoints";
import { Fetch, Put, Post } from "../../hooks/apiUtils";
import {
  populateFormFields,
  populateFormData,
  getSelectFormattedData,
} from "../../hooks/general";

interface ProductProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ProductForm: React.FC<ProductProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState<any>(
    data?.id ? populateFormFields(ProductFormType, data) : ProductFormType
  );

  const [formData, setFormData] = useState<any>(
    data?.id ? populateFormData(ProductFormType, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/product/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "uoms", fieldName: "uom" },
          { key: "brands", fieldName: "brand" },
          { key: "categories", fieldName: "productCategory" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data[mapping.key] || data?.[mapping.key];
            if (Array.isArray(dataKey) && dataKey.length > 0) {
              const selectData = getSelectFormattedData(dataKey);
              return { ...field, options: selectData };
            }
          }
          return field;
        });
        setFormField(updatedFormField);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          fields={formField}
          formData={formData}
          returnAs="formData"
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default ProductForm;
