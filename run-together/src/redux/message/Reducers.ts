import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { ISideBarChatroom } from "../../interface";
import actionCreator from "./actionCreator";

export const chatroomListReducer: ValidateSliceCaseReducers<
  Array<ISideBarChatroom>,
  typeof actionCreator
> = actionCreator;
