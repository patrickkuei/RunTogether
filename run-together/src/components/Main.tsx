import * as React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import SideBar from "./SideBar";
import Chatroom from "./Chatroom";

export default function Main() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Chatroom />
    </Layout>
  );
}
