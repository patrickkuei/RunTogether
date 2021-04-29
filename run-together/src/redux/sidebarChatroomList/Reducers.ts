import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { ISideBarChatroomList, ISideBarChatroom } from "../../interface";
import actionCreator from "./actionCreator";

export const sideBarChatroomListReducer: ValidateSliceCaseReducers<
  ISideBarChatroomList,
  typeof actionCreator
> = actionCreator;
