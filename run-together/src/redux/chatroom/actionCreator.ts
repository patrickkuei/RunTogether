import { PayloadAction } from "@reduxjs/toolkit";
import { IChatroom, IChatroomMessage } from "../../interface";

const updateChatroom = (
  prevState: IChatroom,
  action: PayloadAction<IChatroom>
): IChatroom => action.payload;

const addMessage = (
  prevState: IChatroom,
  action: PayloadAction<IChatroomMessage>
): IChatroom => {
  const newChatroom: IChatroom = {
    ...prevState,
    chatroomMessages: [
      ...prevState.chatroomMessages,
      action.payload
    ]
  }
  return newChatroom;
};

const actions = { updateChatroom, addMessage }

export default actions ;
