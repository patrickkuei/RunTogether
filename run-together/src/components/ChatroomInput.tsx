import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Layout } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useAppDispatch } from "../redux/app/hooks";
import { chatroomActions } from "../redux/chatroom/slice";
import { IChatroom, IChatroomMessage, MessageType } from "../interface";
import { sideBarChatroomListActions } from "../redux/sidebarChatroomList/slice";
import useChatGPT from "../hooks/useChatGPT";
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
  const [isEmojiPickerVisibled, setIsEmojiPickerVisibled] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { updatePrompt } = useChatGPT(currentParticipant)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (inputValue !== "") {
      updatePrompt(inputValue)

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
    }
  };
  const onEmojiClick = (
    event: React.MouseEvent,
    emojiObject: IEmojiData
  ): void => {
    setInputValue((prev) => prev + emojiObject.emoji);
  };

  const toggleEmojiPickerVisibled = (): void => {
    setIsEmojiPickerVisibled((prev) => !prev);
  };

  const handleInputFocused = (): void => {
    if (isEmojiPickerVisibled) {
      setIsEmojiPickerVisibled(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [chatroom]);

  return (
    <Footer style={{ display: "flex" }}>
      <form style={{ flex: 1 }} onSubmit={handleFormSubmit}>
        <input
          onFocus={handleInputFocused}
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
      <div
        style={{
          maxWidth: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={toggleEmojiPickerVisibled}
          shape="circle"
          icon={<SmileOutlined />}
        />
      </div>
      {isEmojiPickerVisibled ? (
        <div style={{ position: "absolute", bottom: 53, right: 0 }}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : (
        <></>
      )}
    </Footer>
  );
}
