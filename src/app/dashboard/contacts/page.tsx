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
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email Id", sortable: true },
  { key: "phone", label: "Cont. No.", sortable: true },
  { key: "source", label: "Source", sortable: true },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Email ID", value: "email" },
  { label: "Cont. No.", value: "phone" },
  { label: "Source", value: "source" },
];

const Leads: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Contacts"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Contacts");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Contacts"
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
