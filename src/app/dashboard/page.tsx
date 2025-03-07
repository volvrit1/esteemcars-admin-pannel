"use client";

import AuthGuard from "../../components/AuthGuard";
import Wrapper from "../../components/common/Wrapper";
import Summary from "../../components/dashboard/Summary";
import Home from "../page";


const Dashboard: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <div>
          {/* <Home /> */}
          {/* <Summary /> */}
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
