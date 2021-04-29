import { createSlice } from "@reduxjs/toolkit";
import Chatroom from "../../components/Chatroom";
import {
  IChatroom,
  IChatroomMessage,
  IUser,
  MessageType,
} from "../../interface";
import { useAppSelector } from "../app/hooks";
import { chatroomReducer } from "./Reducers";

const _initialUserState: IUser = {
  id: -1,
  name: "",
  avatarUrl: "initial user avatar url",
};
const _initialParticipantState: IUser = {
  id: -1,
  name: "",
  avatarUrl: "initial participant avatarUrl",
};

const _initialChatroomMessages: IChatroomMessage[] = [
  {
    id: "initial id",
    type: MessageType.Text,
    senderId: 1,
    message: "",
    createdAt: 0,
  },
];

const _initialState: IChatroom = {
  isloading: false,
  currentParticipant: _initialParticipantState,
  currentUser: _initialUserState,
  chatroomMessages: _initialChatroomMessages,
};

export const chatroomSlice = createSlice({
  name: "chatroomSlice",
  initialState: _initialState,
  reducers: chatroomReducer,
});

export const chatroomActions = chatroomSlice.actions;

export const useChatroom = () => useAppSelector((state) => state.chatroom);

export default chatroomSlice.reducer;
