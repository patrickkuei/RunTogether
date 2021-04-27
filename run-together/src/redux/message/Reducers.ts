import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { IChatroomList, ISideBarChatroom } from "../../interface";
import actionCreator from "./actionCreator";

export const chatroomListReducer: ValidateSliceCaseReducers<
  IChatroomList,
  typeof actionCreator
> = actionCreator;
