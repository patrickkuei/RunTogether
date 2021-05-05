import { PayloadAction } from "@reduxjs/toolkit";
import { IChatroom, IChatroomMessage } from "../../interface";

const updateChatroom = (
  prevState: IChatroom | null,
  action: PayloadAction<IChatroom>
): IChatroom => action.payload;

const addMessage = (
  prevState: IChatroom | null,
  action: PayloadAction<IChatroomMessage>
): IChatroom | void => {
  if (prevState !== null) {
    const newChatroom: IChatroom = {
      ...prevState,
      chatroomMessages:
        prevState.chatroomMessages !== undefined
          ? [...prevState.chatroomMessages, action.payload]
          : [action.payload],
    };
    return newChatroom;
  }
};

const actions = { updateChatroom, addMessage };

export default actions;
