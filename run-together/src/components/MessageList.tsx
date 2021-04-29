import React, { useEffect, useRef } from "react";
import { Layout, Menu, Breadcrumb, Image } from "antd";
import { IChatroom } from "../interface";
const { Content } = Layout;

type MessageListProps = {
  chatroom: IChatroom;
};

export default function MessageList({ chatroom }: MessageListProps) {
  const { avatarUrl } = chatroom.currentParticipant;

  const bottomDiv = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatroom]);

  return (
    <Content style={{ overflow: "hidden scroll" }}>
      {chatroom.chatroomMessages[0].id === "initial id" ? (
        <div></div>
      ) : (
        <div
          className="site-layout-background"
          style={{ padding: 16, minHeight: 360 }}
        >
          {chatroom.chatroomMessages.map((message) => (
            <div
              key={message.id}
              style={
                message.senderId === 0
                  ? {
                      display: "flex",
                      marginBottom: 30,
                      flexDirection: "row-reverse",
                    }
                  : { display: "flex", marginBottom: 20 }
              }
            >
              {message.senderId === 0 ? (
                <div></div>
              ) : (
                <div
                  className="avatar"
                  style={{
                    width: 30,
                    display: "flex",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Image
                    src={avatarUrl}
                    width={30}
                    height={30}
                    preview={false}
                    style={{ borderRadius: 25 }}
                  />
                </div>
              )}

              <div
                style={
                  message.senderId === 0
                    ? { background: "#ffffff", padding: 8, borderRadius: 16 }
                    : {
                        background: "#4179f1",
                        padding: 8,
                        borderRadius: 16,
                        color: "#ffffff",
                      }
                }
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ float: "left", clear: "both" }} ref={bottomDiv}></div>
    </Content>
  );
}
