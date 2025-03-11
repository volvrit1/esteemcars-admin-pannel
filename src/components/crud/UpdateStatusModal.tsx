import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { Put } from "../../hooks/apiUtils";

// Types for bank details
interface BankDetail {
  name: string;
  interestRate: number;
  tenure: number;
  amount: number;
}

const UpdateStatusModal = ({ data, fetchData, setIsStatusModalOpen }: any) => {
  const [status, setStatus] = useState<string>(data?.status ?? "");
  const [reason, setReason] = useState(data?.disApprovalReason || "");
  const [bankDetails, setBankDetails] = useState<BankDetail[]>(
    data?.approvedBankData?.banks || []
  );
  const [recommendedBank, setRecommendedBank] = useState(data?.approvedBankData?.recommendedBank||"");
  // Function to handle the status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  // Function to add a new bank detail row
  const addBankDetail = () => {
    setBankDetails([
      ...bankDetails,
      { name: "", interestRate: 0, tenure: 0, amount: 0 },
    ]);
  };

  // Function to remove a bank detail row
  const removeBankDetail = (index: number) => {
    const updatedBankDetails = bankDetails.filter((_, i) => i !== index);
    setBankDetails(updatedBankDetails);
  };

  // Function to handle input changes for bank details
  const handleBankDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: "name" | "interestRate" | "tenure" | "amount"
  ) => {
    const updatedBankDetails = [...bankDetails];
    updatedBankDetails[index] = {
      ...updatedBankDetails[index],
      [field]: e.target.value,
    };
    setBankDetails(updatedBankDetails);
  };

  const handleSubmit = async () => {
    const id = data?.id;
    try {
      const res: any = await Put(
        `/api/loan-query/${id}`,
        {
          status,
          approvedBankData:
            status === "Approved"
              ? {
                  banks: bankDetails,
                  recommendedBank,
                }
              : null,
          disApprovalReason: status === "Disapproved" ? reason : null,
        },
        5000
      );
      if (res.success) {
        fetchData();
        setIsStatusModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-3/5 h-auto">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Disapproved">Disapproved</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Bank Details */}
        {status === "Approved" && (
          <div className="h-[50vh] overflow-y-auto">
            <div>
              <h3 className="text-lg font-medium mb-2">Bank Details</h3>
              {bankDetails.map((_, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  <div className="flex gap-4">
                    {/* Bank Select */}
                    <div className="flex-1">
                      <label
                        htmlFor={`bank_${index}`}
                        className="block text-sm font-medium"
                      >
                        Bank:
                      </label>
                      <input
                        type="text"
                        id={`bank_${index}`}
                        value={bankDetails[index].name}
                        onChange={(e) =>
                          handleBankDetailChange(e, index, "name")
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                        placeholder="Bank Name"
                      />
                      {/* <select
                        id={`bank_${index}`}
                        value={bankDetails[index].bank}
                        onChange={(e) =>
                          handleBankDetailChange(e, index, "bank")
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                      >
                        <option value="bank1">Bank 1</option>
                        <option value="bank2">Bank 2</option>
                        <option value="bank3">Bank 3</option>
                      </select> */}
                    </div>

                    {/* Interest Rate */}
                    <div className="flex-1">
                      <label
                        htmlFor={`interestRate_${index}`}
                        className="block text-sm font-medium"
                      >
                        Interest Rate:
                      </label>
                      <input
                        type="number"
                        id={`interestRate_${index}`}
                        value={bankDetails[index].interestRate}
                        onChange={(e) =>
                          handleBankDetailChange(e, index, "interestRate")
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                        placeholder="Interest Rate"
                      />
                    </div>

                    {/* Tenure */}
                    <div className="flex-1">
                      <label
                        htmlFor={`tenure_${index}`}
                        className="block text-sm font-medium"
                      >
                        Tenure:
                      </label>
                      <input
                        type="number"
                        id={`tenure_${index}`}
                        value={bankDetails[index].tenure}
                        onChange={(e) =>
                          handleBankDetailChange(e, index, "tenure")
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                        placeholder="Tenure (Months)"
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor={`amount${index}`}
                        className="block text-sm font-medium"
                      >
                        Amount:
                      </label>
                      <input
                        type="number"
                        id={`amount_${index}`}
                        value={bankDetails[index].amount}
                        onChange={(e) =>
                          handleBankDetailChange(e, index, "amount")
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                        placeholder="Tenure (Months)"
                      />
                    </div>

                    <div className="self-center">
                      <button
                        type="button"
                        onClick={() => removeBankDetail(index)}
                        className="bg-red-500 text-white p-3 mt-7 rounded"
                      >
                        <IoTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={addBankDetail}
                className="bg-blue-500 text-white p-2 rounded w-full outline-none"
              >
                Add Bank
              </button>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="recoBank">Recommended Bank</label>
              <select
                id="recoBank"
                className="mt-2 p-2 border border-gray-300 rounded w-full
          outline-none"
                value={recommendedBank}
                onChange={(e) => setRecommendedBank(e.target.value)}
              >
                <option value="">Select Bank</option>
                {bankDetails &&
                  bankDetails?.map((bank, index) => (
                    <option key={index} value={bank?.name}>
                      {bank?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {status === "Disapproved" && (
          <div>
            <div className="flex flex-col mb-4">
              <label htmlFor="reason">Reason</label>
              <textarea
                rows={4}
                className="mt-2 p-2 border border-gray-300 rounded w-full outline-none"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded w-1/2"
          >
            Update Status
          </button>
          <button
            type="button"
            onClick={() => setIsStatusModalOpen(false) /* Close modal */}
            className="bg-gray-500 text-white p-2 rounded w-1/2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
