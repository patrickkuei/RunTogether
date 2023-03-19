import React, { useEffect, useRef } from "react";
import { IChatroom } from "../interface";

const useScrollToBottom = (chatroom: IChatroom | null) => {
  const container = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    setTimeout(() => {
      const child = container.current?.lastChild as HTMLDivElement;

      child?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatroom?.currentParticipant.id, chatroom?.chatroomMessages]);

  return container;
};

export default useScrollToBottom;
