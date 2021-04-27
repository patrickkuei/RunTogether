import { createSlice } from "@reduxjs/toolkit";
import { IChatroomList, ISideBarChatroom, IUser } from "../../interface";
import { useAppSelector } from "../app/hooks";
import { chatroomListReducer } from "./Reducers";

const initialUserState: IUser = {
  id: -1,
  name: "initial user name",
  avatarUrl: "initial user avatarUrl",
};

export const initialState: IChatroomList = {
  isLoading: true,
  chatroomList: [
    {
      id: "initial id",
      participant: initialUserState,
      unreadMessageCount: 0,
    },
  ],
};

export const chatRoomListSlice = createSlice({
  name: "chatRoomListSlice",
  initialState,
  reducers: chatroomListReducer,
});

export const chatroomListActions = chatRoomListSlice.actions;

export const useChatroomList = () =>
  useAppSelector((state) => state.chatroomList);

export default chatRoomListSlice.reducer;
