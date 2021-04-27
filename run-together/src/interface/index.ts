import { FunctionComponent } from "react";

export interface IChatroomList {
  isLoading: boolean;
  chatroomList: ISideBarChatroom[];
}
export interface ISideBarChatroom {
  id: string;
  participant: IUser;
  latestMessage?: ILatestMessage;
  unreadMessageCount: number;
}

export interface ILatestMessage {
  id: string;
  type: MessageType;
  senderId: number;
  preview?: string;
  createdAt: number;
}

export enum MessageType {
  Text,
  Image,
  Video,
  File,
}

export interface IUser {
  id: number;
  name: string;
  avatarUrl: string;
}
