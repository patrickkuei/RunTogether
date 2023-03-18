import React, { useCallback, useEffect, useRef } from "react";
import { Layout, Image, Button, Empty } from "antd";
import { IChatroom, IChatroomMessage } from "../interface";
import { getRandomMessages } from "../mock/GetRandomMessages";
import { chatroomActions } from "../redux/chatroom/slice";
import { useAppDispatch } from "../redux/app/hooks";
import CodeDisplay from "./share/CodeDisplay";
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
    const index = str.indexOf("AI:");

    return index < 0 ? str : str.slice(index + 4);
  };

  const splitSentenceIntoWordsAndCode = useCallback((sentence: string) => {
    const regex = /```[\s\S]*?```/gm;
    const codeBlocks = sentence.match(regex);

    if (!codeBlocks || codeBlocks.length === 0) {
      return [sentence];
    }

    const blocks = [];
    let lastIndex = 0;

    codeBlocks.forEach((codeBlock) => {
      const index = sentence.indexOf(codeBlock, lastIndex);

      if (index > lastIndex) {
        blocks.push(sentence.substring(lastIndex, index).replace(/```/g, ""));
      }

      blocks.push(codeBlock.replace(/```/g, ""));
      lastIndex = index + codeBlock.length;
    });

    if (lastIndex < sentence.length) {
      blocks.push(sentence.substring(lastIndex));
    }

    return blocks;
  }, []);

  const renderMessage = (message: IChatroomMessage) => {
    const className = message.senderId ? "message" : "message user";
    const formattedTexts = splitSentenceIntoWordsAndCode(message.message);

    const textDom = formattedTexts.map((text, idx) => {
      const formattedText =
        chatroom?.currentParticipant.id === 999 && message.senderId === 999
          ? getAiResponse(text)
          : text;

      return idx % 2 ? (
        <CodeDisplay key={text} value={formattedText} />
      ) : (
        formattedText
      );
    });

    return <div className={className}>{textDom}</div>;
  };

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
                    alt="avatar"
                    src={avatarUrl}
                    width={30}
                    height={30}
                    preview={false}
                  />
                </div>
              )}
              {renderMessage(message)}
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
