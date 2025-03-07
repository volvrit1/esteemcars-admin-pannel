"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DynamicForm from "../common/DynamicForm";
import { BillingFormType } from "./formInput/BillingFormTypes";
import { endpoints } from "../../data/endpoints";
import { Put, Post, Fetch } from "../../hooks/apiUtils";
import {
  populateFormFields,
  populateFormData,
  getSelectFormattedData,
} from "../../hooks/general";

interface BillingProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const BillingForm: React.FC<BillingProps> = (props: any) => {
  const data = props.data;

  const formType = props.formType;
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState<any>(
    data?.id ? populateFormFields(BillingFormType, data) : BillingFormType
  );

  const [formData, setFormData] = useState<any>(
    data?.id ? populateFormData(BillingFormType, data) : {}
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

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const url = `/api/invoice/${id}`;
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "ledgers", fieldName: "shipTo" },
          { key: "users", fieldName: "preparedBy" },
          { key: "packings", fieldName: "packing" },
          { key: "ledgers", fieldName: "invoiceTo" },
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
    fetchData(data?.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <DynamicForm
            returnAs="object"
            fields={formField}
            formData={formData}
            submitting={submitting}
            onClose={props?.onClose}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
          />
        </>
      )}
    </div>
  );
};

export default BillingForm;
