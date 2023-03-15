import { createSlice } from "@reduxjs/toolkit";

import { IChatroom } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { chatroomReducer } from "./Reducers";

const initialState: IChatroom | null = {
    currentParticipant: {
      id: 999,
      name: 'ChatGPT',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/2432/2432846.png',
    },
    currentUser: {
      id: 0,
      name: 'Human',
      avatarUrl: '',
    },
    chatroomMessages: []
};

export const chatroomSlice = createSlice({
  name: "chatroomSlice",
  initialState,
  reducers: chatroomReducer,
});

export const chatroomActions = chatroomSlice.actions;

export const useChatroom = () => useAppSelector((state) => state.chatroom);

export default chatroomSlice.reducer;
