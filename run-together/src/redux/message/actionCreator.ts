import { PayloadAction } from "@reduxjs/toolkit";
import { IChatroomList, ISideBarChatroom } from "../../interface";

const updateList = (
  prevState: IChatroomList,
  action: PayloadAction<Array<ISideBarChatroom>>
): IChatroomList => {
  const newList: Array<ISideBarChatroom> = action.payload;
  return {
    isLoading: false,
    chatroomList: newList,
  };
};
export default { updateList };
