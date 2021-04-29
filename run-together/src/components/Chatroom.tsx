import React from "react";
import { Layout } from "antd";
import ChatroomInput from "./ChatroomInput";
import ChatroomMessageList from "./ChatroomMessageList";
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
      <ChatroomMessageList chatroom={chatroom} />
      <ChatroomInput />
    </Layout>
  );
}
