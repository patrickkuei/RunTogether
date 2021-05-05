import { createSlice } from "@reduxjs/toolkit";
import { ISideBarChatroomList } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { sideBarChatroomListReducer } from "./Reducers";

const initialState: ISideBarChatroomList | null = null;

const sideBarChatRoomListSlice = createSlice({
  name: "sideBarChatRoomListSlice",
  initialState,
  reducers: sideBarChatroomListReducer,
});

export const sideBarChatroomListActions = sideBarChatRoomListSlice.actions;

export const useSideBarChatroomList = () =>
  useAppSelector((state) => state.sideBarChatroomList);

export default sideBarChatRoomListSlice.reducer;
