"use client";

import AuthGuard from "../../../components/AuthGuard";
import Loader from "../../../components/common/Loader";
import TableComponent from "../../../components/common/Table";
import Wrapper from "../../../components/common/Wrapper";
import { useAuth } from "../../../context/AuthContext";
import { endpoints } from "../../../data/endpoints";
import { getAccessPoints } from "../../../hooks/general";
import useFetch from "../../../hooks/useFetch";

const columns = [
  { key: "id", label: "Invoice ID", sortable: false },
  { key: "invoiceNumber", label: "Invoice Number", sortable: true },
  { key: "invoiceDate", label: "Invoice Date", sortable: true },
  { key: "dueDate", label: "Due Date", sortable: true },
  { key: "totalAmount", label: "Total Amount", sortable: true },
  { key: "company", label: "Company ID", sortable: false },
  { key: "status", label: "Status", sortable: true },
  { key: "paymentTerms", label: "Payment Terms", sortable: false },
  { key: "paymentDetails.amountPaid", label: "Amount Paid", sortable: true },
  {
    key: "paymentDetails.paymentMethod",
    label: "Payment Method",
    sortable: false,
  },
  {
    key: "billingAddress.line1",
    label: "Billing Address (Line 1)",
    sortable: false,
  },
  { key: "billingAddress.city", label: "City", sortable: true },
  { key: "billingAddress.state", label: "State", sortable: true },
  { key: "billingAddress.pinCode", label: "Pin Code", sortable: true },
  { key: "billingAddress.country", label: "Country", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
  { key: "updatedAt", label: "Updated At", sortable: true },
];
const filterOptions = [
  { label: "Vessel IMO NO", value: "no" },
  { label: "Cont. Name", value: "name" },
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "mobileNo" },
  { label: "Category", value: "ledgerType" },
  { label: "Comp. Name", value: "companyName" },
  { label: "State", value: "state" },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Billing"].fetchAll);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Billing");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Billing"
          suffix=""
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Users;
