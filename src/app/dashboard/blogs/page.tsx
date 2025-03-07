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
  { key: "id", label: "Employee ID" },
  { key: "title", label: "Title", sortable: true },
  { key: "content", label: "Content", sortable: false },
  { key: "author", label: "Author", sortable: true },
  { key: "slug", label: "Slug", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
  { key: "updatedAt", label: "Updated At", sortable: true, isDate: true },
];

const filterOptions = [{ label: "Title", value: "title" }];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Blogs"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Blogs");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Blogs"
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
