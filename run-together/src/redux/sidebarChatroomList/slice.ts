import { createSlice } from "@reduxjs/toolkit";
import { ISideBarChatroomList } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { sideBarChatroomListReducer } from "./Reducers";

const initialState: ISideBarChatroomList | null = {
  list: [
    {
      id: "999",
      participant: {
        id: 999,
        name: "ChatGPT",
        avatarUrl: "https://cdn-icons-png.flaticon.com/512/2432/2432846.png",
      },
      unreadMessageCount: 0,
      tempMessages: [],
    },
  ],
};

const sideBarChatRoomListSlice = createSlice({
  name: "sideBarChatRoomListSlice",
  initialState,
  reducers: sideBarChatroomListReducer,
});

export const sideBarChatroomListActions = sideBarChatRoomListSlice.actions;

export const useSideBarChatroomList = () =>
  useAppSelector((state) => state.sideBarChatroomList);

export default sideBarChatRoomListSlice.reducer;
