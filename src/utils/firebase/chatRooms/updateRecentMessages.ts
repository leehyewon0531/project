import {
  DocumentReference,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { COLLECTION_NAMES } from "../../../constants/firestore.constant";

export async function updateRecentMessages(
  chatRoomId: string,
  messageRef: DocumentReference
) {
  try {
    const chatRoomRef = doc(db, COLLECTION_NAMES.CHATROOMS, chatRoomId);
    await updateDoc(chatRoomRef, {
      recentMessages: arrayUnion(messageRef),
    });
  } catch (error) {
    console.error(error);
  }
}
