import React, { useState } from "react";
import axios from "axios";
import { Put } from "../../hooks/apiUtils";

export default function UpdateLeadsStatusModal({
  id,
  onClose,
  fetchData,
  data,
}) {
  const [status, setStatus] = useState(data?.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await Put(`/api/loan-application/${id}`, { status }, 5000, true).then(
        (res: any) => {
          if (res?.success) {
            fetchData();
            onClose();
          }
        }
      );
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
          <option value="Pending">Pending</option>
          <option value="Metallized">Materialize</option>
          <option value="In-Progess">In Progress</option>
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
