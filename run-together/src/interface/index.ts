import { FunctionComponent } from "react";

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
  createdAt: Date;
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
