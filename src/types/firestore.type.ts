import { CollectionReference, Timestamp } from "firebase/firestore";

export interface BaseDocument {
  name: string;
  chatRooms: Array<CollectionReference>;
}

// 구조가 동일하지만, 가독성을 위해 따로 정의
export type UserDocument = BaseDocument;
export type CharacterDocument = BaseDocument;

export interface ChatRoomDocument {
  character: string;
  user: string;
  recentMessages: Array<CollectionReference>;
}

export interface MessageDocument {
  sender: string;
  chatRoomId: string;
  createdAt: Timestamp;
  content: string;
}
