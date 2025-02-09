import styles from "./ChatRoom.module.css";
import Message from "../Message/Message";
import { useState } from "react";

export default function ChatRoom() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className={styles["chatroom-container"]}>
      <div className={styles["chatroom-msg-container"]}>
        <Message
          sender="user_1"
          content="테스트 문자열입니다. 테스트 문자열입니다. 개행이 어떻게 이루어지는지 확인용"
          timestamp="2024-02-09T12:34:56.789Z"
        />
        <Message
          sender="char_1"
          content="test2"
          timestamp="2024-02-09T12:35:56.789Z"
        />
        <Message
          sender="user_1"
          content="테스트 문자열입니다. 테스트 문자열입니다. 개행이 어떻게 이루어지는지 확인용"
          timestamp="2024-02-09T12:34:56.789Z"
        />
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
