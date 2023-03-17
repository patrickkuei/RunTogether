import React, { useEffect, useRef } from "react";
import { Layout, Image, Button, Empty } from "antd";
import { IChatroom, IChatroomMessage } from "../interface";
import { getRandomMessages } from "../mock/GetRandomMessages";
import { chatroomActions } from "../redux/chatroom/slice";
import { useAppDispatch } from "../redux/app/hooks";
const { Content } = Layout;

type MessageListProps = {
  chatroom: IChatroom | null;
};

export default function ChatroomMessageList({ chatroom }: MessageListProps) {
  const avatarUrl = chatroom ? chatroom.currentParticipant.avatarUrl : "";
  const bottomDiv = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = (): void => {
    setTimeout(() => {
      const child = bottomDiv.current?.lastChild as HTMLDivElement;

      child?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  const dispatch = useAppDispatch();
  const { loadMore } = chatroomActions;

  useEffect(() => {
    scrollToBottom();
  }, [chatroom?.currentParticipant.id, chatroom?.chatroomMessages]);

  const handleLoadMoreClick = (): void => {
    if (chatroom) {
      const moreMessages: IChatroomMessage[] | undefined = getRandomMessages(
        chatroom.currentParticipant.id
      );
      if (moreMessages) {
        dispatch(loadMore(moreMessages));
      }
    }
  };

  const getAiResponse = (str: string): string => {
    const mainTextIndex = str.indexOf("AI:") + 4

    return str.slice(mainTextIndex)
  }

  return (
    <Content className="message-list-container">
      {chatroom && chatroom.chatroomMessages !== undefined ? (
        <div ref={bottomDiv} className="site-layout-background">
          {chatroom.currentParticipant.id === 999 ? null : (
            <div
              className="message-container"
              style={{ justifyContent: "center" }}
            >
              <Button
                type="primary"
                shape="round"
                onClick={handleLoadMoreClick}
              >
                load more
              </Button>
            </div>
          )}
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
              {message.senderId === 0 ? (
                <div
                  className="message user"
                >
                  {message.message}
                </div>
              ) : (
                <div
                  className="message"
                >
                  {chatroom.currentParticipant.id === 999 ? getAiResponse(message.message) : message.message}
                </div>
              )}
            </div>
          ))}
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
