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
  { key: "id", label: "ID" },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "middleName", label: "Middle Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "title", label: "Title", sortable: true },
  { key: "dob", label: "Date of Birth", sortable: true, isDate: true },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone Number", sortable: true },
  { key: "leadNumber", label: "Lead Number", sortable: true },
  { key: "userType", label: "User Type", sortable: true },
  {
    key: "callbackRequested",
    label: "Callback Requested",
    sortable: true,
    status: true,
  },
  { key: "createdAt", label: "Created At", sortable: true },
];

const filterOptions = [
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "phone" },
  { label: "State", value: "state" },
];

const Leads: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Call"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Call");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Call Back"
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
