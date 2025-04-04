import React from "react";
import ChatApp from "../../../components/common/chat/ChatApp";
import AuthGuard from "../../../components/AuthGuard";
import Wrapper from "../../../components/common/Wrapper";

export default function page() {
  return (
    <AuthGuard>
      <Wrapper>
        <ChatApp />
      </Wrapper>
    </AuthGuard>
  );
}
