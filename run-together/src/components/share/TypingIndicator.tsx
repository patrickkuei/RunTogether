import React from "react";
import { Image } from "antd";
import { useAppSelector } from "../../redux/app/hooks";

type Props = {
  avatarUrl: string;
};

const TypingIndicator = ({ avatarUrl }: Props) => {
  const isResponding = useAppSelector((state) => state.chatroom?.isResponding);

  return isResponding ? (
    <div role="typing-indicator" className="message-container">
      <div className="avatar">
        <Image
          alt="avatar"
          src={avatarUrl}
          width={30}
          height={30}
          preview={false}
        />
      </div>
      <div className="message typing-indicator">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  ) : null;
};

export default TypingIndicator;
