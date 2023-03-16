import React, { FunctionComponent, ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import sideBarChatRoomListSlice from "./sidebarChatroomList/slice";
import chatroomSlice from "./chatroom/slice";

const store = configureStore({
  reducer: {
    sideBarChatroomList: sideBarChatRoomListSlice,
    chatroom: chatroomSlice,
  },
});

export const StoreProvider: FunctionComponent<{children: ReactNode}> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
