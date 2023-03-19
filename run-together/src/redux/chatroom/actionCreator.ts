import { PayloadAction } from "@reduxjs/toolkit";
import { IChatroom, IChatroomMessage } from "../../interface";

const updateChatroom = (
  prevState: IChatroom | null,
  action: PayloadAction<IChatroom>
): IChatroom => ({ ...prevState, ...action.payload });

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

const loadMore = (
  prevState: IChatroom | null,
  action: PayloadAction<IChatroomMessage[]>
): IChatroom | void => {
  if (prevState !== null && prevState.chatroomMessages !== undefined) {
    const moreMessage = action.payload;
    return {
      ...prevState,
      chatroomMessages: [...moreMessage, ...prevState.chatroomMessages],
    };
  }
};

const setIsResponding = (
  prevState: IChatroom | null,
  action: PayloadAction<boolean>
): IChatroom | void => {
  if (prevState !== null) {
    return {
      ...prevState,
      isResponding: action.payload,
    };
  }
};

const actions = { updateChatroom, addMessage, loadMore, setIsResponding };

export default actions;
