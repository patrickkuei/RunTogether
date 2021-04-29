import { createSlice } from "@reduxjs/toolkit";
import { ISideBarChatroomList, IUser } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { sideBarChatroomListReducer } from "./Reducers";

const _initialParticipantState: IUser = {
  id: -1,
  name: "initial user name",
  avatarUrl: "initial user avatarUrl",
};

const _initialState: ISideBarChatroomList = {
  isLoading: true,
  list: [
    {
      id: "initial id",
      participant: _initialParticipantState,
      unreadMessageCount: 0,
    },
  ],
};

const sideBarChatRoomListSlice = createSlice({
  name: "sideBarChatRoomListSlice",
  initialState: _initialState,
  reducers: sideBarChatroomListReducer,
});

export const sideBarChatroomListActions = sideBarChatRoomListSlice.actions;

export const useSideBarChatroomList = () =>
  useAppSelector((state) => state.sideBarChatroomList);

export default sideBarChatRoomListSlice.reducer;
