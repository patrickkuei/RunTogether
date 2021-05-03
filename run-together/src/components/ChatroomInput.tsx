import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Layout } from "antd";
import { useAppDispatch } from "../redux/app/hooks";
import { chatroomActions } from "../redux/chatroom/slice";
import { IChatroom, IChatroomMessage, MessageType } from "../interface";
import { sideBarChatroomListActions } from "../redux/sidebarChatroomList/slice";
const { Footer } = Layout;

type ChatroomInputProps = {
  chatroom: IChatroom;
};
export default function ChatroomInput({ chatroom }: ChatroomInputProps) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const { addMessage } = chatroomActions;
  const { addTempMessage } = sideBarChatroomListActions;
  const { currentParticipant } = chatroom;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newMessage: IChatroomMessage = {
      id: uuidv4(),
      type: MessageType.Text,
      senderId: 0,
      message: inputValue,
      createdAt: new Date().getTime(),
    };
    dispatch(addMessage(newMessage));
    dispatch(addTempMessage({ currentParticipant, newMessage }));
    setInputValue("");
  };

  return (
    <Footer>
      <form onSubmit={handleFormSubmit}>
        <input value={inputValue} onChange={handleInputChange} />
      </form>
    </Footer>
  );
}
