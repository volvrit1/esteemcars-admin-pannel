import React, { useState } from "react";
import axios from "axios";
import { Put } from "../../hooks/apiUtils";
import { toast } from "react-toastify";

const options = [
  { value: "", label: "Select Status" },
  { value: "Eligible", label: "Eligible" },
  { value: "Not Eligible", label: "Not Eligible" },
  { value: "Pending", label: "Pending" },
  { value: "Lost", label: "Lost" },
  { value: "Working", label: "Working" },
  { value: "Progress", label: "Progress" },
  { value: "No Response", label: "No Response" },
  { value: "Won", label: "Won" },
];


export default function UpdateLeadsStatusModal({
  id,
  onClose,
  fetchData,
  data,
}) {
  const [status, setStatus] = useState(data?.status);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(data?.disapprovalReason);

  const handleSendForm = async (data: any) => {
    setLoading(true);

    let updated = {
      name: data.name,
      status: data.status,
      reason: data.reason,
      trackingUrl: data?.link,
      mobile: data?.code + data?.mobile,
    };
    if (data.status === "Not Eligible") delete updated?.trackingUrl;
    try {
      const res = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
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
      const domainWithProtocol = `https://esteemfinance.co.nz/apply-for-car-loan?id=${data?.id}`;
      const sanitizedCountryCode = data?.countryCode?.replace(/[+\\]/g, "");
      const updated = {
        status,
        reason: reason,
        mobile: data?.mobile,
        link: domainWithProtocol,
        code: sanitizedCountryCode,
        name:
          `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim() || "User",
      };
      const shouldSendForm = status === "Eligible" || status === "Not Eligible";
      if (shouldSendForm) {
        const formRes = await handleSendForm(updated);
        if (!formRes?.result) return;
      }
      const dataPayload =
        status === "Not Eligible"
          ? {
            status,
            disapprovalReason: reason,
          }
          : {
            status,
          };
      const res: any = await Put(
        `/api/loan-application/${id}`,
        dataPayload,
        5000,
        false
      );
      if (res?.success) {
        setReason("");
        setStatus("");
        fetchData();
        onClose();
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

        {status === "Not Eligible" && (
          <div className="flex flex-col mb-4">
            <label htmlFor="reason" className=" mb-4">
              Not Eligible Reason
            </label>
            <textarea
              name="reason"
              id="reason"
              placeholder="Enter here reason..."
              rows={4}
              className="w-full p-2 outline-none border rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}
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
