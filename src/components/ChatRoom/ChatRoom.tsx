import styles from "./ChatRoom.module.css";
import Message from "../Message/Message";
import { useEffect, useState } from "react";
import { getCurrentMessages } from "../../utils/firebase/chatRooms/getCurrentMessages";
import { MessageDocument } from "../../types/firestore.type";
import { sortMessagesByTimestamp } from "../../utils/common/sortMessages";
import { sendMessage } from "../../utils/firebase/messages/sendMessage";
import { doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";

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

  const handleClickSendBtn = async () => {
    const msgResult = await sendMessage(
      doc(db, "users", import.meta.env.VITE_TEST_USER_ID),
      userInput,
      import.meta.env.VITE_TEST_CHATROOM_ID
    );
    if (msgResult) setUserInput("");
  };

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
          value={userInput || ""}
        />
        <button className={styles["msg-btn"]} onClick={handleClickSendBtn}>
          전송
        </button>
      </div>
    </div>
  );
}
