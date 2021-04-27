import React, { useEffect } from "react";
import { Menu } from "antd";
import SideBarChatroom from "./SideBarChatroom";
import { chatroomListActions, useChatroomList } from "../redux/message/slice";
import { useAppDispatch } from "../redux/app/hooks";
import { ISideBarChatroom } from "../interface";
import { getRandomChatroom } from "../mock/GetRandomChatroom";

type ChatroomListProps = {
  collapsed: boolean;
};

export default function ChatroomList({ collapsed }: ChatroomListProps) {
  const chatroomList = useChatroomList();
  const dispatch = useAppDispatch();
  const { updateList } = chatroomListActions;
  const newChatroomList: ISideBarChatroom[] = [];
  const updateSideBarChatroom = () => {
    for (let i = 0; i < 5; i++) {
      newChatroomList.push(getRandomChatroom());
    }
    dispatch(updateList(newChatroomList));
  };

  useEffect(() => {
    updateSideBarChatroom();
  }, []);

  return chatroomList.isLoading ? (
    <div>loading...</div>
  ) : (
    <Menu theme="light" mode="inline">
      {chatroomList.chatroomList.map((sideBarChatroom) => (
        <Menu.Item
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
