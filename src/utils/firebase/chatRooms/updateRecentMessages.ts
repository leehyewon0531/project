import {
  DocumentReference,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function updateRecentMessages(
  chatRoomId: string,
  messageRef: DocumentReference
) {
  try {
    const chatRoomRef = doc(db, "chatRooms", chatRoomId);
    await updateDoc(chatRoomRef, {
      recentMessages: arrayUnion(messageRef),
    });
  } catch (error) {
    console.error(error);
  }
}
