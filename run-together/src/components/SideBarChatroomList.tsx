import React, { useEffect } from "react";
import { Menu } from "antd";
import SideBarChatroom from "./SideBarChatroom";
import {
  sideBarChatroomListActions,
  useSideBarChatroomList,
} from "../redux/sidebarChatroomList/slice";
import { useAppDispatch } from "../redux/app/hooks";
import { IChatroom, ISideBarChatroom, IUser } from "../interface";
import { getRandomChatroom } from "../mock/GetRandomChatroom";
import { chatroomActions } from "../redux/chatroom/slice";
import { getRandomMessages } from "../mock/GetRandomMessages";

type SideBarChatroomListProps = {
  collapsed: boolean;
};

export default function SideBarChatroomList({
  collapsed,
}: SideBarChatroomListProps) {
  const sideBarChatroomList = useSideBarChatroomList();
  const dispatch = useAppDispatch();
  const { updateList, resetUnreadCountById } = sideBarChatroomListActions;
  const { updateChatroom } = chatroomActions;
  const newSideBarChatroomList: ISideBarChatroom[] = [];

  // mock fatching data
  const updateSideBarChatroom = () => {
    for (let i = 0; i < 5; i++) {
      newSideBarChatroomList.push(getRandomChatroom());
    }
    dispatch(updateList(newSideBarChatroomList));
  };

  useEffect(() => {
    updateSideBarChatroom();
  }, []);

  // mock fatching data
  const getChatroomByParticipant = (participent: IUser): IChatroom => {
    const newRandomMessages = getRandomMessages(participent.id);
    const currentUser: IUser = {
      id: 0,
      name: "YOU",
      avatarUrl: "/userImg.jpg",
    };
    return {
      isloading: false,
      currentParticipant: participent,
      currentUser,
      chatroomMessages: newRandomMessages,
    };
  };

  const handleSideBarChatroomClick = (sideBarChatroom: ISideBarChatroom) => {
    const { id, participant } = sideBarChatroom;
    dispatch(resetUnreadCountById(id));
    dispatch(updateChatroom(getChatroomByParticipant(participant)));
  };

  return sideBarChatroomList.isLoading ? (
    <div>loading...</div>
  ) : (
    <Menu theme="light" mode="inline">
      {sideBarChatroomList.list.map((sideBarChatroom) => (
        <Menu.Item
          onClick={() => handleSideBarChatroomClick(sideBarChatroom)}
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
