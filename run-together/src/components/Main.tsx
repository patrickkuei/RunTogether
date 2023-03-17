import * as React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import SideBar from "./SideBar";
import Chatroom from "./Chatroom";

export default function Main() {
  return (
    <Layout
      style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "hidden" }}
    >
      <SideBar />
      <Chatroom />
    </Layout>
  );
}
