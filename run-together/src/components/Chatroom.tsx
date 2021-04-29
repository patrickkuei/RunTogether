import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import InputForm from "./InputForm";
import MessageList from "./MessageList";
import ChatroomHeader from "./ChatroomHeader";
import { useChatroom } from "../redux/chatroom/slice";

const { Header } = Layout;

export default function Chatroom() {
  const chatroom = useChatroom();

  return (
    <Layout className="site-layout">
      <Header className="header-background" style={{ padding: 0 }}>
        <ChatroomHeader chatroom={chatroom} />
      </Header>
      <MessageList chatroom={chatroom} />
      <InputForm />
    </Layout>
  );
}
