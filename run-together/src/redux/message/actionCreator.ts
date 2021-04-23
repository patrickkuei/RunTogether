import { PayloadAction } from "@reduxjs/toolkit";
import { ISideBarChatroom } from "../../interface";

interface IUpdateListPayload {
  newList: Array<ISideBarChatroom>
}

const updateList = (
  prevState: Array<ISideBarChatroom>,
  action: PayloadAction<Array<ISideBarChatroom>>
): Array<ISideBarChatroom> => {
  return [...action?.payload];
};
export default { updateList };
