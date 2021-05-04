import React from "react";
import { Image } from "antd";
import { IChatroom } from "../interface";

type ChatroomHeaderProps = {
  chatroom: IChatroom;
};

export default function ChatroomHeader({ chatroom }: ChatroomHeaderProps) {
  return (
    <div className="chatroom-header-container">
      <div className="chatroom-header-participant">
        {chatroom.currentParticipant.name}
      </div>
      <div className="chatroom-header-user-container">
        <div className="user">{chatroom.currentUser.name}</div>
        {chatroom.currentUser.avatarUrl === "initial user avatar url" ? (
          <></>
        ) : (
          <Image
            width={50}
            height={50}
            src={chatroom.currentUser.avatarUrl}
            preview={false}
            className="user-img"
          />
        )}
      </div>
    </div>
  );
}
