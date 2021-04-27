import React, { FunctionComponent } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import sideBarChatRoomListSlice from "./message/slice";

const store = configureStore({
  reducer: {
    sideBarChatroomList: sideBarChatRoomListSlice,
  },
});

export const ChatroomListProvider: FunctionComponent = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
