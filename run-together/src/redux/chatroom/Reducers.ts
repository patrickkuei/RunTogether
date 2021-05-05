import { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { IChatroom } from "../../interface";
import actionCreator from "./actionCreator";

export const chatroomReducer: ValidateSliceCaseReducers<
  IChatroom | null,
  typeof actionCreator
> = actionCreator;
