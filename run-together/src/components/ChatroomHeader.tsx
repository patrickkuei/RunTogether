import React from "react";
import { Image } from "antd";
import { IChatroom } from "../interface";

type ChatroomHeaderProps = {
  chatroom: IChatroom;
};

export default function ChatroomHeader({ chatroom }: ChatroomHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ textAlign: "center", flex: 0.8 }}>
        {chatroom.currentParticipant.name}
      </div>
      <div
        style={{
          textAlign: "center",
          flex: 0.2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0 12px" }}>{chatroom.currentUser.name}</div>
        {chatroom.currentUser.avatarUrl === "initial user avatar url" ? (
          <></>
        ) : (
          <Image
            width={50}
            height={50}
            src={chatroom.currentUser.avatarUrl}
            preview={false}
            style={{ borderRadius: 25 }}
          />
        )}
      </div>
    </div>
  );
}
