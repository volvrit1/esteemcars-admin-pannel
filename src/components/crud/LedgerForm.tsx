"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DynamicForm from "../common/DynamicForm";
import { LedgerType } from "./formInput/ledgerFormType";
import { endpoints } from "../../data/endpoints";
import { Fetch, Put, Post } from "../../hooks/apiUtils";
import {
  populateFormFields,
  populateFormData,
  getSelectFormattedData,
  nestFields,
} from "../../hooks/general";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const LedgerForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?.id ? populateFormFields(LedgerType, data) : LedgerType
  );
  const [formData, setFormData] = useState<any>(
    data?.id ? populateFormData(LedgerType, data) : {}
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const url = "/api/user/public-role/Salesperson";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data.length > 0) {
          const selectData = getSelectFormattedData(response.data);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "groupBy") return { ...obj, options: selectData };
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
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?.id) url = `${endpoints[formType].update}${data?.id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      const nestedObj = nestFields(updatedData, "address", [
        "city",
        "line1",
        "state",
        "street",
        "pinCode",
        "country",
        "landmark",
      ]);
      const response: any = data?.id
        ? await Put(url, nestedObj)
        : await Post(url, nestedObj);

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

export default LedgerForm;
