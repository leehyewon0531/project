import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
  return (
    <div>
      <ChatRoom chatRoomId={String(import.meta.env.VITE_TEST_CHATROOM_ID)} />
    </div>
  );
}

export default App;
