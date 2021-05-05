import { createSlice } from "@reduxjs/toolkit";

import { IChatroom } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { chatroomReducer } from "./Reducers";

const initialState: IChatroom | null = null;

export const chatroomSlice = createSlice({
  name: "chatroomSlice",
  initialState,
  reducers: chatroomReducer,
});

export const chatroomActions = chatroomSlice.actions;

export const useChatroom = () => useAppSelector((state) => state.chatroom);

export default chatroomSlice.reducer;
