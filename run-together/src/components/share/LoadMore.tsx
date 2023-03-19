import React from "react";
import { Button } from "antd";
import { IChatroom, IChatroomMessage } from "../../interface";
import { getRandomMessages } from "../../mock/GetRandomMessages";
import { useAppDispatch } from "../../redux/app/hooks";
import { chatroomActions } from "../../redux/chatroom/slice";

type Props = {
  chatroom: IChatroom;
};

const LoadMore = ({ chatroom }: Props) => {
  const dispatch = useAppDispatch();
  const { loadMore } = chatroomActions;

  const handleLoadMoreClick = (): void => {
    const moreMessages: IChatroomMessage[] | undefined = getRandomMessages(
      chatroom.currentParticipant.id
    );
    if (moreMessages) {
      dispatch(loadMore(moreMessages));
    }
  };

  return chatroom.currentParticipant.id === 999 ? null : (
    <div className="message-container" style={{ justifyContent: "center" }}>
      <Button type="primary" shape="round" onClick={handleLoadMoreClick}>
        Load More
      </Button>
    </div>
  );
};

export default LoadMore;
