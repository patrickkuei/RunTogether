import React from "react";
import { MessageOutlined, FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { configs } from "../configs";

type SideBarHeaderProps = {
  collapsed: boolean;
};

export default function SideBarHeader({ collapsed }: SideBarHeaderProps) {
  return !collapsed ? (
    <>
      <div className="logo-container">
        <MessageOutlined className="logo-icon" />
      </div>
      <div className="header-logo">{configs.sideBar.logo}</div>
      <Button
        className="sidebar_button"
        size="large"
        icon={<FormOutlined className="sideBar_button_icon" />}
      />
    </>
  ) : (
    <div className="collapsed-logo-icon-container">
      <MessageOutlined className="logo-icon" />
    </div>
  );
}
