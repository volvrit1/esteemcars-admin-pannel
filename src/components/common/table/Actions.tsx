import Modal from "../Modal";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";
import { endpoints } from "../../../data/endpoints";
import { Fetch, Delete } from "../../../hooks/apiUtils";
import ConfirmationModal from "../../crud/ConfirmationModal";
import UpdateStatusModal from "../../crud/UpdateStatusModal";
import { RxUpdate } from "react-icons/rx";
import UpdateLeadsStatusModal from "../../crud/UpdateLeadsStatus";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

interface RowData {
  id: string;
}

interface OperationsAllowed {
  chat?: boolean;
  update?: boolean;
  delete?: boolean;
  viewStock?: boolean;
  invoice?: boolean;
  updateStatus?: boolean;
  updateLeadsStatus?: boolean;
}

interface ActionsProps {
  row: RowData;
  type: keyof typeof endpoints;
  setData: (data: any) => void;
  setFilteredData: (data: any) => void;
  operationsAllowed: OperationsAllowed;
  setPaginate: (pagination: any) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  isStatusModalOpen?: boolean;
  setIsStatusModalOpen?: (isVisible: boolean) => void;
  isLeadsStatusModalOpen?: boolean;
  setIsLeadsStatusModalOpen?: (isVisible: boolean) => void;
}

const Actions: React.FC<ActionsProps> = ({
  type,
  row,
  setData,
  setPaginate,
  setFilteredData,
  setIsModalVisible,
  operationsAllowed,
  isStatusModalOpen,
  setIsStatusModalOpen,
  isLeadsStatusModalOpen,
  setIsLeadsStatusModalOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectIdForDeletion, setSelectIdForDeletion] = useState<string>("");
  const [rowData, setRowData] = useState<any>();
  const [id, setId] = useState("");

  const handleEdit = async (id?: string) => {
    if (!id) return;

    try {
      const endpoint = endpoints[type]?.read;

      if (!endpoint) return;

      const response: any = await Fetch(`${endpoint}${id}`, {}, 5000, true);
      if (
        response?.success &&
        (response?.data?.id || response?.data?.result?.id)
      ) {
        setData(response.data.result ? response.data.result : response.data);
      } else setData({});
      setIsModalVisible(true);
    } catch (error) {
      console.log("Handle Edit", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      setSelectIdForDeletion(id);
      if (!showDeleteModal) return setShowDeleteModal(true);

      const deleteEndpoint = endpoints[type]?.delete;
      const fetchEndpoint = endpoints[type]?.fetchAll;

      if (deleteEndpoint && fetchEndpoint) {
        await Delete(`${deleteEndpoint}${id}`);
        const response: any = await Fetch(fetchEndpoint, {}, 5000, true, false);

        if (response?.success) {
          setShowDeleteModal(false);
          setFilteredData(response?.data?.result);
          setPaginate(response?.data?.pagination);
        } else window.location.reload();
      }
    } catch (error) {
      console.log("Handle Delete", error);
    }
  };

  const fetchFilterData = async () => {
    const fetchEndpoint = endpoints[type]?.fetchAll;
    const response: any = await Fetch(fetchEndpoint, {}, 5000, true, false);

    if (response?.success) {
      setShowDeleteModal(false);
      setFilteredData(response?.data?.result);
      setPaginate(response?.data?.pagination);
    } else window.location.reload();
  };

  const handleView = async (id?: string) => {
    if (!id) return;
    const url = `${pathname}/${id}`;
    return router.push(url);
  };
  const handleStatusModal = (id?: string) => {
    if (!id) return;
    setIsStatusModalOpen(true);
  };

  const handleLeadsStaus = (id?: string, row?: any) => {
    if (!id) return;
    {
      setId(id);
      setRowData(row);
      setIsLeadsStatusModalOpen(true);
    }
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal isVisible={showDeleteModal} onClose={handleDeleteModal}>
        <ConfirmationModal
          id={selectIdForDeletion}
          handleDelete={handleDelete}
          handleDeleteModal={handleDeleteModal}
        />
      </Modal>
      {operationsAllowed?.update && (
        <button
          onClick={() => handleEdit(row.id)}
          className="text-blue-500 text-xl hover:scale-125 hover:p-1 mr-1 hover:bg-blue-100 p-1 rounded transition"
        >
          <FaEdit title="Edit" />
        </button>
      )}
      {operationsAllowed?.delete && (
        <button
          onClick={() => handleDelete(row.id)}
          className="text-red-700 text-xl hover:scale-125 hover:p-1 hover:bg-red-100 p-1 rounded transition"
        >
          <FaTrash title="Delete" />
        </button>
      )}
      {operationsAllowed?.viewStock && (
        <button
          onClick={() => handleView(row.id)}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <FaEye title="View Stock" />
        </button>
      )}
      {operationsAllowed?.invoice && (
        <button
          onClick={() => handleStatusModal(row.id)}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <FaFileInvoiceDollar title="View Stock" />
        </button>
      )}
      {operationsAllowed?.updateStatus && (
        <button
          onClick={() => handleStatusModal(row.id)}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <RxUpdate title="View Loan Status" />
        </button>
      )}

      {operationsAllowed?.updateLeadsStatus && (
        <button
          onClick={() => handleLeadsStaus(row.id, row)}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <RxUpdate title="Update Leads Status" />
        </button>
      )}

      {operationsAllowed?.chat && (
        <Link
          href={"/dashboard/client-chat"}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <FaWhatsapp title="Chat with client" />
        </Link>
      )}

      {isStatusModalOpen && (
        <UpdateStatusModal
          fetchData={fetchFilterData}
          setIsStatusModalOpen={setIsStatusModalOpen}
          data={row}
        />
      )}
      {isLeadsStatusModalOpen && rowData?.id === id && (
        <UpdateLeadsStatusModal
          fetchData={fetchFilterData}
          id={id}
          data={rowData}
          onClose={() => setIsLeadsStatusModalOpen(false)}
        />
      )}
    </>
  );
};

export default Actions;
