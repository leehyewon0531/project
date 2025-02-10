import { getDoc } from "firebase/firestore";
import { getChatRoomById } from "./getChatRoomById";
import { MessageDocument } from "../../../types/firestore.type";

export async function getCurrentMessages(
  chatRoomId: string
): Promise<Array<MessageDocument>> {
  try {
    const chatRoomData = await getChatRoomById(chatRoomId);
    if (!chatRoomData) return [];

    const recentMessages = await Promise.all(
      chatRoomData.recentMessages.map(async (messageRef) => {
        const messageSnapshot = await getDoc(messageRef);
        if (messageSnapshot.exists()) return { ...messageSnapshot.data() };
        else return null;
      })
    );

    // null이 아닌 값들을 Array<MessageDocument> 형태로 반환
    return recentMessages.filter((msg): msg is MessageDocument => msg !== null);
  } catch (error) {
    console.log(error);
    return [];
  }
}
