import styles from "./ChatRoom.module.css";
import Message from "../Message/Message";
import { useEffect, useState } from "react";
import { getCurrentMessages } from "../../utils/firebase/chatRooms/getCurrentMessages";
import { MessageDocument } from "../../types/firestore.type";
import { sortMessagesByTimestamp } from "../../utils/common/sortMessages";

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Array<MessageDocument>>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getCurrentMessages(chatRoomId);
      const sortedMessages = sortMessagesByTimestamp(fetchedMessages);
      setMessages(sortedMessages);
    };

    fetchMessages();
  }, [chatRoomId]);

  return (
    <div className={styles["chatroom-container"]}>
      <div className={styles["chatroom-msg-container"]}>
        {messages.map((el, idx) => (
          <Message
            key={idx}
            sender={el.sender}
            content={el.content}
            timestamp={el.createdAt}
          />
        ))}
      </div>
      <div className={styles["msg-input-btn-container"]}>
        <input
          className={styles["msg-input"]}
          type="text"
          placeholder="메시지를 적어주세요!"
          onChange={(e) => {
            setUserInput(e.currentTarget.value);
          }}
          defaultValue={userInput}
        />
        <button className={styles["msg-btn"]}>전송</button>
      </div>
    </div>
  );
}
