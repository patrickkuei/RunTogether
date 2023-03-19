import React, { useEffect, useRef } from "react";
import { Layout, Empty } from "antd";
import { IChatroom } from "../interface";
import TypingIndicator from "./share/TypingIndicator";
import LoadMore from "./share/LoadMore";
import ChatroomMessage from "./ChatroomMessage";
import useScrollToBottom from "../hooks/useScrollToBottom";

const { Content } = Layout;

type MessageListProps = {
  chatroom: IChatroom | null;
};

export default function ChatroomMessageList({ chatroom }: MessageListProps) {
  const avatarUrl = chatroom?.currentParticipant.avatarUrl;

  const messageList = useScrollToBottom(chatroom);

  return (
    <Content className="message-list-container">
      {chatroom && chatroom.chatroomMessages !== undefined ? (
        <div ref={messageList} className="site-layout-background">
          <LoadMore chatroom={chatroom} />
          {chatroom.chatroomMessages.map((message) => (
            <ChatroomMessage
              key={message.id}
              chatroom={chatroom}
              message={message}
            />
          ))}
          <TypingIndicator avatarUrl={avatarUrl || ""} />
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty />
        </div>
      )}
    </Content>
  );
}
