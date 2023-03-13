import React, { useLayoutEffect, useRef } from "react";
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
      bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  const dispatch = useAppDispatch();
  const { loadMore } = chatroomActions;

  useLayoutEffect(() => {
    scrollToBottom();
  }, [chatroom?.currentParticipant.id]);

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

  return (
    <Content className="message-list-container">
      {chatroom && chatroom.chatroomMessages !== undefined ? (
        <div className="site-layout-background">
          <div
            className="message-container"
            style={{ justifyContent: "center" }}
          >
            <Button type="primary" shape="round" onClick={handleLoadMoreClick}>
              load more
            </Button>
          </div>
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

              <div
                className={message.senderId === 0 ? "message user" : "message"}
              >
                {message.message}
              </div>
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
      <div className="divForAutoScroll" ref={bottomDiv}></div>
    </Content>
  );
}
