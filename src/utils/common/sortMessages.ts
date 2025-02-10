import { MessageDocument } from "../../types/firestore.type";

export function sortMessagesByTimestamp(messages: Array<MessageDocument>) {
  return messages.sort((a, b) => {
    const timeA = a.createdAt;
    const timeB = b.createdAt;

    return (
      timeA.seconds - timeB.seconds || timeA.nanoseconds - timeB.nanoseconds
    );
  });
}
