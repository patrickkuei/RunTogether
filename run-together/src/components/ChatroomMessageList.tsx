import React, { useEffect, useRef, useState } from "react";
import { Layout, Image, Button } from "antd";
import { IChatroom, IChatroomMessage } from "../interface";
import { getRandomMessages } from "../mock/GetRandomMessages";
const { Content } = Layout;

type MessageListProps = {
  chatroom: IChatroom | null;
};

export default function ChatroomMessageList({ chatroom }: MessageListProps) {
  const [visibleMessages, setVisibleMessages] = useState<
    IChatroomMessage[] | undefined
  >([]);
  const avatarUrl = chatroom ? chatroom.currentParticipant.avatarUrl : "";
  const bottomDiv = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setVisibleMessages(chatroom?.chatroomMessages);
  }, [chatroom?.chatroomMessages]);

  useEffect(() => {
    console.log(chatroom);

    scrollToBottom();
  }, [chatroom]);

  const handleLoadMoreClick = (): void => {
    if (chatroom) {
      const moreMessages: IChatroomMessage[] | undefined = getRandomMessages(
        chatroom.currentParticipant.id
      );
      setVisibleMessages((prev) => {
        if (prev && moreMessages) {
          return [...moreMessages, ...prev];
        }
      });
    }
  };

  return (
    <Content className="message-list-container">
      {chatroom && visibleMessages !== undefined ? (
        <div className="site-layout-background">
          <div
            className="message-container"
            style={{ justifyContent: "center" }}
          >
            <Button type="primary" shape="round" onClick={handleLoadMoreClick}>
              load more
            </Button>
          </div>
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={
                message.senderId === 0
                  ? "message-container user"
                  : "message-container"
              }
            >
              {message.senderId === 0 ? (
                <></>
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
                className={message.senderId === 0 ? "message user" : "message"}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>nothing</div>
      )}
      <div className="divForAutoScroll" ref={bottomDiv}></div>
    </Content>
  );
}
