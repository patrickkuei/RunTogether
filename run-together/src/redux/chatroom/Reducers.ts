import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { IChatroom, ISideBarChatroomList } from "../../interface";
import actionCreator from "./actionCreator";

export const chatroomReducer: ValidateSliceCaseReducers<
  IChatroom,
  typeof actionCreator
> = actionCreator;
