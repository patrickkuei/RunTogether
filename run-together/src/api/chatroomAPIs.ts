import { getRandomMessages } from "../mock/GetRandomMessages";

export const chatroomAPIs = {
  getChatroomMessages: (id: number) => getRandomMessages(id),
};
