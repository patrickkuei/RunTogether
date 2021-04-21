import * as React from "react";
import Chatroom from "./Chatroom";
import SideBar from "./SideBar";

export default function Main() {
  return (
    <React.Fragment>
      <SideBar />
      <Chatroom />
    </React.Fragment>
  );
}
