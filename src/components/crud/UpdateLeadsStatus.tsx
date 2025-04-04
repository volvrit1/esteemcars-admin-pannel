import React, { useState } from "react";
import axios from "axios";
import { Put } from "../../hooks/apiUtils";
import { toast } from "react-toastify";

const options = [
  { value: "", label: "Select Status" },
  { value: "Eligible", label: "Eligible" },
  { value: "Not Eligible", label: "Not Eligible" },
  { value: "Pending", label: "Pending" },
];

export default function UpdateLeadsStatusModal({
  id,
  onClose,
  fetchData,
  data,
}) {
  const [status, setStatus] = useState(data?.status);
  const [loading, setLoading] = useState(false);
  const [link, setlink] = useState("");

  const handleSendForm = async (countryCode, mobile, name, link, status) => {
    setLoading(true);

    const Data = {
      mobile: countryCode + mobile,
      name: name,
      trackingUrl: link,
      status,
    };

    try {
      const res = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      const result = await res.json();
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      console.log(status);
      if (status === "Eligible") {
        const sanitizedCountryCode = data?.countryCode?.replace(/[+\\]/g, "");
        const formRes = await handleSendForm(
          sanitizedCountryCode,
          data?.mobile,
          data?.fistName + " " + data?.lastName,
          link,
          status
        );

        console.log(formRes);
        if (formRes?.result) {
          await Put(`/api/loan-application/${id}`, { status }, 5000, true).then(
            (res: any) => {
              if (res?.success) {
                fetchData();
                onClose();
              }
            }
          );
        } else if(status === "Not Eligible") {
          const sanitizedCountryCode = data?.countryCode?.replace(/[+\\]/g, "");
          const formRes = await handleSendForm(
            sanitizedCountryCode,
            data?.mobile,
            data?.fistName + " " + data?.lastName,
            link,
            status
          );

          console.log(formRes);
          if (formRes?.result) {
            await Put(
              `/api/loan-application/${id}`,
              { status },
              5000,
              true
            ).then((res: any) => {
              if (res?.success) {
                fetchData();
                onClose();
              }
            });
          }
        }
      } else {
        await Put(`/api/loan-application/${id}`, { status }, 5000, true).then(
          (res: any) => {
            if (res?.success) {
              fetchData();
              onClose();
            }
          }
        );
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Status</h2>
        <label className="block mb-4 ">
          <span className="text-gray-700">Select Status</span>
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mb-8 outline-none p-2 border rounded"
        >
          {options?.map((opt, index) => (
            <option key={index} value={opt?.value}>
              {opt?.label}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
