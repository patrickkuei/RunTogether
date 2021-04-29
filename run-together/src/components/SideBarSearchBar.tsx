import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { configs } from "../configs";

type SearchBarProps = {
  collapsed: boolean;
  handleSearchIconClick?: () => void;
};

export default function SideBarSearchBar({ collapsed, handleSearchIconClick }: SearchBarProps) {
  
  return !collapsed ? (
    <div className="search-bar-container">
      <Input
        bordered={false}
        placeholder={configs.sideBar.searchInput}
        prefix={<SearchOutlined />}
      />
    </div>
  ) : (
    <div className="collapsed-search-icon-container" onClick={handleSearchIconClick}>
      <SearchOutlined className="collapsed-search-icon" />
    </div>
  );
}
