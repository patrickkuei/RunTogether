import { ISideBarChatroom } from "../interface";
import { getRandomSideBarChatroom } from "../mock/GetRandomSideBarChatroom";

export const sideBarChatroomAPIs = {
  getSideBarChatroomList: () => {
    const _newSideBarChatroomList: ISideBarChatroom[] = [];
    const numberOfSideBarChatroom = Math.floor((Math.random() + 4) * 10);
    for (let i = 0; i < numberOfSideBarChatroom; i++) {
      _newSideBarChatroomList.push(getRandomSideBarChatroom());
    }

    return _newSideBarChatroomList;
  },
};
