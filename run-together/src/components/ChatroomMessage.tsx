import React, { useCallback } from "react";
import { Image } from "antd";
import { IChatroom, IChatroomMessage } from "../interface";
import CodeDisplay from "./share/CodeDisplay";

type Props = {
  chatroom: IChatroom;
  message: IChatroomMessage;
};

const ChatroomMessage = ({ chatroom, message }: Props) => {
  const avatarUrl = chatroom ? chatroom.currentParticipant.avatarUrl : "";

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
    <div
      key={message.id}
      className={
        message.senderId === 0 ? "message-container user" : "message-container"
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
  );
};

export default ChatroomMessage;
