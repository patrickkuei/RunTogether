import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { ISideBarChatroomList } from "../../interface";
import actionCreator from "./actionCreator";

export const sideBarChatroomListReducer: ValidateSliceCaseReducers<
  ISideBarChatroomList | null,
  typeof actionCreator
> = actionCreator;
