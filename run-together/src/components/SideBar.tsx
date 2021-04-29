import React, { useState } from "react";
import { Layout } from "antd";
import SideBarChatroomList from "./SideBarChatroomList";
import SideBarSearchBar from "./SideBarSearchBar";
import SideBarHeader from "./SideBarHeader";

const { Header, Sider } = Layout;

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleSearchIconClick = (): void => {
    setCollapsed(prev => !prev);
  }

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  return (
    <Sider
      className="sideBar"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={350}
    >
      <Header className={collapsed ?"sideBar_header collapsed_header" :"sideBar_header"}>
        <SideBarHeader collapsed={collapsed} />
      </Header>
      <SideBarSearchBar collapsed={collapsed} handleSearchIconClick={handleSearchIconClick}  />
      <SideBarChatroomList collapsed={collapsed} />
    </Sider>
  );
}
