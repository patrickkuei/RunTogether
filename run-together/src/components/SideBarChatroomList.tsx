import React, { useEffect } from "react";
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
import { getRandomSideBarChatroom } from "../mock/GetRandomSideBarChatroom";
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
  const {
    updateSideBarChatroomList,
    resetUnreadCountById,
    updateTempMessagesByParticipant,
  } = sideBarChatroomListActions;
  const { updateChatroom } = chatroomActions;

  // mock fatching data
  const _newSideBarChatroomList: ISideBarChatroom[] = [];
  const updateSideBarChatroom = () => {
    const numberOfSideBarChatroom = Math.floor(Math.random() * 10);
    for (let i = 0; i < numberOfSideBarChatroom; i++) {
      _newSideBarChatroomList.push(getRandomSideBarChatroom());
    }
    dispatch(updateSideBarChatroomList(_newSideBarChatroomList));
  };

  useEffect(() => {
    updateSideBarChatroom();
  }, []);

  // mock fatching data: if sideBarChatroom.tempMessage exist, then use it without fetch
  const getMessages = (
    sideBarChatroom: ISideBarChatroom
  ): IChatroomMessage[] | undefined => {
    if (sideBarChatroom.tempMessages === undefined) {
      const newMessages: IChatroomMessage[] | undefined = getRandomMessages(
        sideBarChatroom.participant.id
      );
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

  const getNewChatroom = (sideBarChatroom: ISideBarChatroom): IChatroom => {
    const currentUser: IUser = {
      id: 0,
      name: "YOU",
      avatarUrl: "/userImg.jpg",
    };
    const newChatroom: IChatroom = {
      isloading: false,
      currentParticipant: sideBarChatroom.participant,
      currentUser,
      chatroomMessages: getMessages(sideBarChatroom),
    };
    return newChatroom;
  };

  const handleSideBarChatroomClick = (sideBarChatroom: ISideBarChatroom) => {
    const { id } = sideBarChatroom;
    dispatch(resetUnreadCountById(id));
    dispatch(updateChatroom(getNewChatroom(sideBarChatroom)));
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
