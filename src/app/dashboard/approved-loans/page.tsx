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
  { key: "id", label: "Loan Query ID", sortable: true },
  { key: "loanQueryNumber", label: "Loan Query Number", sortable: true,isClickable:true },
  { key: "userId", label: "User ID", sortable: true },
  { key: "userType", label: "User Type", sortable: true },
  { key: "loanAppliedFor", label: "Loan Applied For", sortable: true },
  { key: "purchasePrice", label: "Purchase Price", sortable: true },
  { key: "loanTerm", label: "Loan Term" },
  { key: "paymentFrequency", label: "Payment Frequency", sortable: true },
  { key: "depositAmount", label: "Deposit Amount", sortable: true },
  { key: "make", label: "Vehicle Make", sortable: true },
  { key: "model", label: "Vehicle Model", sortable: true },
  { key: "modelYear", label: "Vehicle Model Year", sortable: true },
  { key: "applicationType", label: "Application Type", sortable: true },
  { key: "maritalStatus", label: "Marital Status", sortable: true },
  { key: "dependents", label: "Number of Dependents", sortable: true },
  { key: "driverLicenseType", label: "Driver License Type" },
  { key: "driverLicenseNumber", label: "Driver License Number" },
  { key: "driverLicenseVersion", label: "Driver License Version" },
  { key: "homeOwnership", label: "Home Ownership", sortable: true },
  { key: "status", label: "Status", sortable: true,isStatus:true },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Updated At", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "phone" },
  { label: "State", value: "state" },
];

const Leads: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["ApprovedLoan"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Loan");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="ApprovedLoan"
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
