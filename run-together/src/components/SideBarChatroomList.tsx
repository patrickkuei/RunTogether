import React, { useEffect } from "react";
import { Menu } from "antd";
import SideBarChatroom from "./SideBarChatroom";
import {
  sideBarChatroomListActions,
  useSideBarChatroomList,
} from "../redux/message/slice";
import { useAppDispatch } from "../redux/app/hooks";
import { ISideBarChatroom } from "../interface";
import { getRandomChatroom } from "../mock/GetRandomChatroom";

type SideBarChatroomListProps = {
  collapsed: boolean;
};

export default function SideBarChatroomList({
  collapsed,
}: SideBarChatroomListProps) {
  const sideBarChatroomList = useSideBarChatroomList();
  const dispatch = useAppDispatch();
  const { updateList, resetUnreadCountById } = sideBarChatroomListActions;

  const newSideBarChatroomList: ISideBarChatroom[] = [];
  const updateSideBarChatroom = () => {
    for (let i = 0; i < 5; i++) {
      newSideBarChatroomList.push(getRandomChatroom());
    }
    dispatch(updateList(newSideBarChatroomList));
  };

  useEffect(() => {
    updateSideBarChatroom();
  }, []);

  const handleSideBarChatroomClick = (id: string) => {
    dispatch(resetUnreadCountById(id));
  };

  return sideBarChatroomList.isLoading ? (
    <div>loading...</div>
  ) : (
    <Menu theme="light" mode="inline">
      {sideBarChatroomList.list.map((sideBarChatroom) => (
        <Menu.Item
          onClick={() => handleSideBarChatroomClick(sideBarChatroom.id)}
          key={sideBarChatroom.id}
          className="sidebar-chatroom-container"
          title={sideBarChatroom.latestMessage?.preview}
        >
          <SideBarChatroom
            sideBarChatroom={sideBarChatroom}
            collapsed={collapsed}
          />
        </Menu.Item>
      ))}
    </Menu>
  );
}
