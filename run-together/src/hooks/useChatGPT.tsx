import { useEffect, useState } from "react";
import axios from "axios";
import { IChatroomMessage, IUser, MessageType } from "../interface";
import { useAppDispatch } from "../redux/app/hooks";
import { v4 as uuidv4 } from "uuid";
import { chatroomActions } from "../redux/chatroom/slice";
import { sideBarChatroomListActions } from "../redux/sidebarChatroomList/slice";

const useChatGPT = (currentParticipant: IUser) => {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<string[]>([
    "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly, and will write every code related include markdown inside a code block properly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?",
  ]);

  const { addMessage } = chatroomActions;
  const { addTempMessage } = sideBarChatroomListActions;

  const fetchData = async () => {
    const nextPrompt = `${history.join("")}\nHuman: ${prompt}`;

    try {
      const { data } = await axios.post("/api/openai", {
        prompt: nextPrompt,
      });

      setHistory([nextPrompt, data]);

      const newMessage: IChatroomMessage = {
        id: uuidv4(),
        type: MessageType.Text,
        senderId: currentParticipant.id,
        message: data,
        createdAt: new Date().getTime(),
      };

      dispatch(addMessage(newMessage));
      dispatch(
        addTempMessage({
          currentParticipant,
          newMessage,
        })
      );
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!prompt.length || currentParticipant.id !== 999) {
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return {
    updatePrompt: setPrompt,
  };
};

export default useChatGPT;
