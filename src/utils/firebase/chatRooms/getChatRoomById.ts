import { doc, getDoc } from "firebase/firestore";
import { ChatRoomDocument } from "../../../types/firestore.type";
import { db } from "../firebase";
import { COLLECTION_NAMES } from "../../../constants/firestore.constant";

export async function getChatRoomById(
  chatRoomId: string
): Promise<ChatRoomDocument | null> {
  try {
    const chatRoomRef = doc(db, COLLECTION_NAMES.CHATROOMS, chatRoomId);
    const chatRoomSnapshot = await getDoc(chatRoomRef);

    if (chatRoomSnapshot.exists()) {
      return chatRoomSnapshot.data() as ChatRoomDocument;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
