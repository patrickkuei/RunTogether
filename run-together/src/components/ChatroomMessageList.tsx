import React, { useEffect, useRef } from "react";
import { Layout, Image } from "antd";
import { IChatroom } from "../interface";
const { Content } = Layout;

type MessageListProps = {
  chatroom: IChatroom;
};

export default function ChatroomMessageList({ chatroom }: MessageListProps) {
  const { avatarUrl } = chatroom.currentParticipant;

  const bottomDiv = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatroom]);

  return (
    <Content className="message-list-container">
      {chatroom.chatroomMessages !== undefined ? (
        chatroom.chatroomMessages[0].id === "initial id" ? (
          <div></div>
        ) : (
          <div className="site-layout-background">
            {chatroom.chatroomMessages.map((message) => (
              <div
                key={message.id}
                className={
                  message.senderId === 0
                    ? "message-container user"
                    : "message-container"
                }
              >
                {message.senderId === 0 ? (
                  <div></div>
                ) : (
                  <div className="avatar">
                    <Image
                      src={avatarUrl}
                      width={30}
                      height={30}
                      preview={false}
                    />
                  </div>
                )}

                <div
                  className={
                    message.senderId === 0 ? "message user" : "message"
                  }
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div></div>
      )}
      <div className="divForAutoScroll" ref={bottomDiv}></div>
    </Content>
  );
}
