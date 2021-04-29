import { PayloadAction } from "@reduxjs/toolkit";
import { ISideBarChatroomList, ISideBarChatroom } from "../../interface";

const updateList = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<Array<ISideBarChatroom>>
): ISideBarChatroomList => {
  const newList: Array<ISideBarChatroom> = action.payload;
  return {
    isLoading: false,
    list: newList,
  };
};

const resetUnreadCountById = (
  prevState: ISideBarChatroomList,
  action: PayloadAction<string>
) => {
  const id = action.payload;
  const newList: Array<ISideBarChatroom> = prevState.list.map(
    (sideBarChatroom: ISideBarChatroom) => {
      const prevSideBarChatroom = { ...sideBarChatroom };
      if (prevSideBarChatroom.id === id) {
        prevSideBarChatroom.unreadMessageCount = 0;
      }
      return prevSideBarChatroom;
    }
  );
  return {
    isLoading: false,
    list: newList,
  };
};

export default { updateList, resetUnreadCountById };
