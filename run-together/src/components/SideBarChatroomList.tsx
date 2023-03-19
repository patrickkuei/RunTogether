import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import SideBarChatroom from "./SideBarChatroom";
import {
  sideBarChatroomListActions,
  useSideBarChatroomList,
} from "../redux/sidebarChatroomList/slice";
import { useAppDispatch } from "../redux/app/hooks";
import {
  IChatroom,
  IChatroomMessage,
  ISideBarChatroom,
  IUser,
} from "../interface";
import { chatroomActions } from "../redux/chatroom/slice";
import { sideBarChatroomAPIs } from "../api/sideBarChatroomAPIs";
import { chatroomAPIs } from "../api/chatroomAPIs";

type SideBarChatroomListProps = {
  collapsed: boolean;
};

export default function SideBarChatroomList({
  collapsed,
}: SideBarChatroomListProps) {
  const sideBarChatroomList = useSideBarChatroomList();
  const dispatch = useAppDispatch();
  const {
    updateSideBarChatroomList,
    resetUnreadCountById,
    updateTempMessagesByParticipant,
  } = sideBarChatroomListActions;
  const { updateChatroom } = chatroomActions;

  const [isLoading, setIsLoading] = useState(true);

  const fetchSideBarChatroom = () => {
    const newSideBarChatroomList: ISideBarChatroom[] =
      sideBarChatroomAPIs.getSideBarChatroomList();
    dispatch(updateSideBarChatroomList(newSideBarChatroomList));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSideBarChatroom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if sideBarChatroom.tempMessage exist, use it without fetch
  const getMessages = (
    sideBarChatroom: ISideBarChatroom
  ): IChatroomMessage[] | undefined => {
    if (
      sideBarChatroom.tempMessages === undefined &&
      sideBarChatroom.id !== "999"
    ) {
      const newMessages: IChatroomMessage[] | undefined =
        chatroomAPIs.getChatroomMessages(sideBarChatroom.participant.id);
      dispatch(
        updateTempMessagesByParticipant({
          participant: sideBarChatroom.participant,
          newMessages,
        })
      );
      return newMessages;
    } else {
      return sideBarChatroom.tempMessages;
    }
  };

  const getCurrentChatroom = (sideBarChatroom: ISideBarChatroom): IChatroom => {
    const currentUser: IUser = {
      id: 0,
      name: "YOU",
      avatarUrl: "/userImg.jpg",
    };
    const newChatroom: IChatroom = {
      currentParticipant: sideBarChatroom.participant,
      currentUser,
      chatroomMessages: getMessages(sideBarChatroom),
      isResponding: false,
    };
    return newChatroom;
  };

  const handleSideBarChatroomClick = (sideBarChatroom: ISideBarChatroom) => {
    const { id } = sideBarChatroom;
    dispatch(resetUnreadCountById(id));
    dispatch(updateChatroom(getCurrentChatroom(sideBarChatroom)));
  };

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["999"]}>
      {sideBarChatroomList &&
        sideBarChatroomList.list.map((sideBarChatroom) => (
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
