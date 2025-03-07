"use client";

import AuthGuard from "../../components/AuthGuard";
import Wrapper from "../../components/common/Wrapper";
import Home from "../../components/dashboard/Home";
import Summary from "../../components/dashboard/Summary";



const Dashboard: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <div>
          <Home />
          {/* <Summary /> */}
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
