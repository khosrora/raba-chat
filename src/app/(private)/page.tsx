"use server"

import { connectToMongodb } from "@/config/db.config";
import { Divider } from "antd";
import ChatArea from "./chatComponents/chat-area/ChatArea";
import Chats from "./chatComponents/chats/Chats";

connectToMongodb();

export default async function Home() {
  return (
    <div className="flex h-[85vh]">
      <Chats />
      <Divider type="vertical" className="h-full border-zinc-700" />
      <ChatArea />
    </div>
  );
}
