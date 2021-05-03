import { PayloadAction } from "@reduxjs/toolkit";

import {
  ISideBarChatroomList,
  ISideBarChatroom,
  IChatroomMessage,
  IUser,
  ILatestMessage,
} from "../../interface";

const updateSideBarChatroomList = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<Array<ISideBarChatroom>>
): ISideBarChatroomList => {
  const newList: Array<ISideBarChatroom> = action.payload;
  return {
    isLoading: false,
    list: newList,
  };
};

const resetUnreadCountById = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<string>
): ISideBarChatroomList => {
  const id = action.payload;
  const newList: Array<ISideBarChatroom> = prevState.list.map(
    (sideBarChatroom: ISideBarChatroom) => {
      const prevSideBarChatroom = { ...sideBarChatroom };
      if (prevSideBarChatroom.id === id) {
        prevSideBarChatroom.unreadMessageCount = 0;
      }
      return prevSideBarChatroom;
    }
  );
  return {
    isLoading: false,
    list: newList,
  };
};

const getLatestMessage = (
  message: IChatroomMessage
): ILatestMessage | undefined => {
  const latestMessage = message;
  return {
    ...latestMessage,
    preview: latestMessage?.message,
  };
};

interface updateTempMessagesProps {
  participant: IUser;
  newMessages: IChatroomMessage[] | undefined;
}

const updateTempMessagesByParticipant = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<updateTempMessagesProps>
): ISideBarChatroomList => {
  const { participant, newMessages } = action.payload;
  if (newMessages !== undefined) {
    const newSideBarChatroomList: ISideBarChatroom[] = prevState.list.map(
      (sideBarChatroom: ISideBarChatroom): ISideBarChatroom => {
        const newSideBarChatroom = { ...sideBarChatroom };
        if (newSideBarChatroom.participant.id === participant.id) {
          newSideBarChatroom.tempMessages = newMessages;
          newSideBarChatroom.latestMessage = getLatestMessage(
            newMessages[newMessages.length - 1]
          );
        }
        return newSideBarChatroom;
      }
    );
    return {
      isLoading: false,
      list: newSideBarChatroomList,
    };
  }
  return prevState;
};

interface addTempMessageProp {
  currentParticipant: IUser;
  newMessage: IChatroomMessage;
}

const addTempMessage = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<addTempMessageProp>
): ISideBarChatroomList => {
  const { currentParticipant, newMessage } = action.payload;
  const newSideBarChatroomList: ISideBarChatroom[] = prevState.list.map(
    (sideBarChatroom: ISideBarChatroom) => {
      const newSideBarChatroom = { ...sideBarChatroom };
      if (newSideBarChatroom.participant.id === currentParticipant.id) {
        if (newSideBarChatroom.tempMessages !== undefined) {
          newSideBarChatroom.tempMessages = [
            ...newSideBarChatroom.tempMessages,
            newMessage,
          ];
        }
        newSideBarChatroom.latestMessage = getLatestMessage(newMessage);
      }
      return newSideBarChatroom;
    }
  );
  return {
    isLoading: false,
    list: newSideBarChatroomList,
  };
};

const actions = {
  updateSideBarChatroomList,
  resetUnreadCountById,
  updateTempMessagesByParticipant,
  addTempMessage,
};

export default actions;
