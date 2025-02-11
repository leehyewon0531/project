import styles from "./ChatRoom.module.css";
import Message from "../Message/Message";
import { useEffect, useState } from "react";
import { getCurrentMessages } from "../../utils/firebase/chatRooms/getCurrentMessages";
import { MessageDocument } from "../../types/firestore.type";
import { sortMessagesByTimestamp } from "../../utils/common/sortMessages";
import { sendMessage } from "../../utils/firebase/messages/sendMessage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import { updateRecentMessages } from "../../utils/firebase/chatRooms/updateRecentMessages";

export default function ChatRoom({ chatRoomId }: { chatRoomId: string }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Array<MessageDocument>>([]);

  useEffect(() => {
    const chatRoomRef = doc(db, "chatRooms", chatRoomId);

    const unsub = onSnapshot(chatRoomRef, async () => {
      const fetchedMessages = await getCurrentMessages(chatRoomId);
      const sortedMessages = sortMessagesByTimestamp(fetchedMessages);
      setMessages(sortedMessages);
    });

    return unsub;
  }, [chatRoomId]);

  useEffect(() => {
    const msgContainer = document.getElementById("chatroom-msg-container");
    if (msgContainer) msgContainer.scrollTop = msgContainer?.scrollHeight;
  }, [messages]);

  const handleClickSendBtn = async () => {
    // 1. 메시지 전송 -> messages Collection
    const messageRef = await sendMessage(
      doc(db, "users", import.meta.env.VITE_TEST_USER_ID),
      userInput,
      import.meta.env.VITE_TEST_CHATROOM_ID
    );

    if (!messageRef) return;

    // 2. 현재 채팅방 recentMessages 업데이트 -> chatRooms Collection
    updateRecentMessages(import.meta.env.VITE_TEST_CHATROOM_ID, messageRef);

    // 3. 사용자 입력 초기화
    setUserInput("");
  };

  return (
    <div className={styles["chatroom-container"]}>
      <div
        id="chatroom-msg-container"
        className={styles["chatroom-msg-container"]}
      >
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
