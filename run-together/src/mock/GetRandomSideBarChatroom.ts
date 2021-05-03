import { ISideBarChatroom, IUser, MessageType } from "../interface";
import { v4 as uuidv4 } from "uuid";
import FirstName from "./FirstName.json";
import LastName from "./LastName.json";

const capitalize = (str: string) => str[0].toUpperCase() + str.substring(0);

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomName = (): string => {
  const randomIntOfFirstName = getRandomInt(0, FirstName.length);
  const randomIntOfLastName = getRandomInt(0, LastName.length);
  const firstName = capitalize(FirstName[randomIntOfFirstName]);
  const lastName = capitalize(LastName[randomIntOfLastName]);

  return `${firstName} ${lastName}`;
};

const getRandomParticipant = (): IUser => {
  const name = getRandomName();
  const encodedName = encodeURIComponent(name);
  return {
    id: Math.floor(Math.random() * 100),
    name,
    avatarUrl: `https://icotar.com/initials/${encodedName}`,
  };
};

export const getRandomSideBarChatroom = (): ISideBarChatroom => ({
  id: uuidv4(),
  participant: getRandomParticipant(),
  latestMessage: {
    id: uuidv4(),
    type: MessageType.Text,
    senderId: Math.floor(Math.random() * 50),
    preview: "message",
    createdAt: new Date().getTime(),
  },
  unreadMessageCount: Math.floor(Math.random() * 1000),
});
