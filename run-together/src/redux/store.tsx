import React, { FunctionComponent } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import chatRoomListSlice from "./message/slice";

const store = configureStore({
  reducer: {
    chatroomList: chatRoomListSlice,
  },
});

export const ChatroomListProvider: FunctionComponent = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
