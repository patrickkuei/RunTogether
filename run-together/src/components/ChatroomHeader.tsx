import React from "react";
import { Image } from "antd";
import { IChatroom, IUser } from "../interface";

type ChatroomHeaderProps = {
  chatroom: IChatroom | null;
};

export default function ChatroomHeader({ chatroom }: ChatroomHeaderProps) {
  const currentUser: IUser = {
    id: 0,
    name: "you",
    avatarUrl: `https://icotar.com/initials/${encodeURIComponent(
      "Patrick Yang"
    )}`,
  };

  return (
    <div className="chatroom-header-container">
      <div className="chatroom-header-participant">
        {chatroom?.currentParticipant.name}
      </div>
      <div className="chatroom-header-user-container">
        <div className="user">{currentUser.name}</div>
        {currentUser.avatarUrl === "initial user avatar url" ? (
          <></>
        ) : (
          <Image
            width={50}
            height={50}
            src={currentUser.avatarUrl}
            preview={false}
            className="user-img"
          />
        )}
      </div>
    </div>
  );
}
