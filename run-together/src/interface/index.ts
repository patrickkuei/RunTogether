export interface ISideBarChatroomList {
  isLoading: boolean;
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
  isloading: boolean;
  currentParticipant: IUser;
  currentUser: IUser;
  chatroomMessages: IChatroomMessage[];
}

export interface IChatroomMessage {
  id: string;
  type: MessageType;
  senderId: number;
  message: string;
  createdAt: number;
}
