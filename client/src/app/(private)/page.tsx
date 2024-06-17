"use server"

import { connectToMongodb } from "@/config/db.config";
import { Divider } from "antd";
import ChatArea from "./chatComponents/chat-area/ChatArea";
import Chats from "./chatComponents/chats/Chats";

connectToMongodb();

export default async function Home() {
  return (
    <div className="flex h-[91vh]">
      <Chats />
      <Divider type="vertical" className="h-full border-zinc-200 px-0 mx-0" />
      <ChatArea />
    </div>
  );
}