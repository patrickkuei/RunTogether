import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { IChatroomMessage, IUser, MessageType } from "../interface";
import { useAppDispatch } from "../redux/app/hooks";
import { v4 as uuidv4 } from "uuid";
import { chatroomActions } from "../redux/chatroom/slice";
import { sideBarChatroomListActions } from "../redux/sidebarChatroomList/slice";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const useChatGPT = (currentParticipant: IUser) => {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<string[]>([
    "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?",
  ]);

  const { addMessage } = chatroomActions;
  const { addTempMessage } = sideBarChatroomListActions;

  const fetchData = async () => {
    const nextPrompt = `${history.join("")}\nHuman: ${prompt}`;

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: nextPrompt,
        temperature: 0.6,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      });

      setHistory([nextPrompt, response.data.choices[0].text || '']);

      const newMessage: IChatroomMessage = {
        id: uuidv4(),
        type: MessageType.Text,
        senderId: currentParticipant.id,
        message: response.data.choices[0].text || "",
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
  }, [prompt]);

  return {
    updatePrompt: setPrompt,
  };
};

export default useChatGPT;
