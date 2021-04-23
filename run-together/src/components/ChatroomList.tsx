import React, { useEffect } from "react";
import { Menu } from "antd";
import SideBarChatroom from "./SideBarChatroom";
import {
  chatroomListActions,
  useChatroomList,
} from "../redux/message/slice";
import { useAppDispatch } from "../redux/app/hooks";
import { ISideBarChatroom, IUser } from "../interface";

export default function ChatroomList() {
  const chatroomList = useChatroomList();
  const dispatch = useAppDispatch();
  const { updateList } = chatroomListActions;

  const updateSideBarChatroom = () => {
    const newUser: IUser = {
      id: 999,
      name: "new user",
      avatarUrl: "new user avatarUrl",
    };
    const newSideBarChatroot: ISideBarChatroom = {
      id: "new id",
      participant: newUser,
      unreadMessageCount: 999,
    };

    dispatch(updateList([newSideBarChatroot]));
  };

  useEffect(() => {
    console.log("before update", chatroomList);
    
    updateSideBarChatroom();

  }, []);

  useEffect(() => {
    console.log("after update", chatroomList);
  }, [chatroomList])

  return (
    <Menu theme="light" mode="inline">
      <Menu.Item key="1">
        <SideBarChatroom />
      </Menu.Item>
      <Menu.Item key="2">
        <SideBarChatroom />
      </Menu.Item>
    </Menu>
  );
}
