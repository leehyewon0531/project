import { DocumentReference, Timestamp } from "firebase/firestore";
import { formatTimestampToTime } from "../../utils/common/formatTimestampToTime";
import styles from "./Message.module.css";
import { COLLECTION_NAMES } from "../../constants/firestore.constant";

interface MessageProps {
  sender: DocumentReference;
  timestamp: Timestamp;
  content: string;
}

export default function Message(props: MessageProps) {
  const { sender, timestamp, content } = props;
  const isUser = sender.parent.path === COLLECTION_NAMES.USERS;

  return (
    <div
      className={`${styles["msg-box"]} ${
        isUser ? styles["msg-box-mine"] : styles["msg-box-character"]
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
