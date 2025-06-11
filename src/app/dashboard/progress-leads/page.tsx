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
  { key: "id", label: "ID", isIndex: true },
  { key: "title", label: "Title", sortable: true },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "otpVerified", label: "Verified", sortable: true, status: true },
  { key: "status", label: "Status", sortable: true, isStatus: true },
  { key: "dateOfBirth", label: "Date of Birth", sortable: true, isDate: true },
  { key: "mobile", label: "Mobile", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "loanAmount", label: "Loan Amount", sortable: true },
  { key: "weeklyPayment", label: "Weekly Payment", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDate: true },

];

const filterOptions = [
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "phone" },
  { label: "State", value: "state" },
];

const Leads: React.FC = () => {
  const { data, loading, error } = useFetch(
    endpoints["Progress"].fetchAll
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Leads");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Progress"
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

export default Leads;
