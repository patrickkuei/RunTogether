import Messages from "./Messages.json"
import {v4 as uuidv4} from "uuid"
import { IChatroomMessage, MessageType } from "../interface"


const getRandomMessage = (senderId: number): IChatroomMessage => {
  const indexOfMessage = Math.floor(Math.random() * (Messages.length))
  const randomSender = Math.floor(Math.random() * 50) > 25 ? 0 : senderId
  
  return ({
  id: uuidv4(),
  type: MessageType.Text,
  senderId: randomSender,
  message: Messages[indexOfMessage],
  createdAt: new Date().getTime() - Math.floor(Math.random() * 3000),
})}

export const getRandomMessages = (senderId: number): IChatroomMessage[] => {
  const newMessages: IChatroomMessage[] = []
  for(let i = 0; i < 50; i++){
    newMessages.push(getRandomMessage(senderId))
  }
  return newMessages;
}