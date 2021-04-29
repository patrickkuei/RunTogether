import { PayloadAction } from "@reduxjs/toolkit";
import { IChatroom, IChatroomMessage, IUser } from "../../interface";
import { getRandomMessages } from "../../mock/GetRandomMessages";

const updateChatroom = (
  prevState: IChatroom,
  action: PayloadAction<IChatroom>
): IChatroom => action.payload

export default { updateChatroom };
