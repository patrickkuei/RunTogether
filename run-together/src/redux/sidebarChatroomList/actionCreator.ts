import { PayloadAction } from "@reduxjs/toolkit";

import {
  ISideBarChatroomList,
  ISideBarChatroom,
  IChatroomMessage,
  IUser,
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

interface updateTempMessagesProps {
  participant: IUser;
  newMessages: IChatroomMessage[];
}

const updateTempMessagesByParticipant = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<updateTempMessagesProps>
): ISideBarChatroomList => {
  const { participant, newMessages } = action.payload;
  const newSideBarChatroomList: ISideBarChatroom[] = prevState.list.map(
    (sideBarChatroom: ISideBarChatroom): ISideBarChatroom => {
      const newSideBarChatroom = { ...sideBarChatroom };
      if (newSideBarChatroom.participant.id === participant.id) {
        newSideBarChatroom.tempMessages = newMessages;
      }
      return newSideBarChatroom;
    }
  );
  return {
    isLoading: false,
    list: newSideBarChatroomList,
  };
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
