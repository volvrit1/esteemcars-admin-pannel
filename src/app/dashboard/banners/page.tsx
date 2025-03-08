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
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Sub Title" },
  { key: "slug", label: "Slug" },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
];

const filterOptions = [{ label: "Email ID", value: "email" }];

const Leads: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Banners"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Banners");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Banners"
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
