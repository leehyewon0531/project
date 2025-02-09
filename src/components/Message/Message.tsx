import { formatTimestampToTime } from "../../utils/formatTimestampToTime";
import styles from "./Message.module.css";

interface MessageProps {
  sender: string;
  timestamp: string;
  content: string;
}

export default function Message(props: MessageProps) {
  const { sender, timestamp, content } = props;
  const isUser = sender.includes("user");

  return (
    <div
      className={`${styles["msg-box"]} ${
        sender.includes("user")
          ? styles["msg-box-mine"]
          : styles["msg-box-character"]
      }`}
    >
      {isUser && <span>{formatTimestampToTime(timestamp)}</span>}
      <div
        className={`${styles["msg"]} ${
          isUser ? styles["msg-mine"] : styles["msg-character"]
        }`}
      >
        {content}
      </div>
      {!isUser && <span>{formatTimestampToTime(timestamp)}</span>}
    </div>
  );
}
