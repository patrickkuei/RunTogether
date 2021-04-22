import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import InputForm from "./InputForm";
import MessageList from "./MessageList";

const { Header } = Layout;

export default function Chatroom() {
  return (
    <Layout className="site-layout">
      <Header className="header-background" style={{ padding: 0 }} />
      <MessageList />
      <InputForm />
    </Layout>
  );
}
