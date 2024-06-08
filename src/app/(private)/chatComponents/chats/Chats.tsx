import React from "react";
import ChatsHeader from "./ChatsHeader";
import ChatsList from "./ChatsList";

function Chats() {
  return (
    <div className="w-[400px] h-full p-5">
      <ChatsHeader />
      <ChatsList />
    </div>
  );
}

export default Chats;
