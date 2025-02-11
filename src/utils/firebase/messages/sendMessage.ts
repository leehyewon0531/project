import {
  DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { COLLECTION_NAMES } from "../../../constants/firestore.constant";

export async function sendMessage(
  sender: DocumentReference,
  content: string,
  chatRoomId: string
): Promise<DocumentReference | null> {
  try {
    const messageRef = await addDoc(collection(db, COLLECTION_NAMES.MESSAGES), {
      sender,
      content,
      chatRoomId,
      createdAt: serverTimestamp(),
    });
    return messageRef;
  } catch (error) {
    console.error(error);
    return null;
  }
}
