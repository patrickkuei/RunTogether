export interface ISideBarChatroomList {
  list: ISideBarChatroom[];
}
export interface ISideBarChatroom {
  id: string;
  participant: IUser;
  tempMessages?: IChatroomMessage[];
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

export interface IChatroom {
  currentParticipant: IUser;
  currentUser: IUser;
  chatroomMessages?: IChatroomMessage[];
  isResponding: boolean;
}

export interface IChatroomMessage {
  id: string;
  type: MessageType;
  senderId: number;
  message: string;
  createdAt: number;
}
