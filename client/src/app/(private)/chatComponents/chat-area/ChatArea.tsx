"use client";
import { ChatState } from "@/redux/chatSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import Recipient from "./Recipient";
import SendMessage from "./SendMessage";

function ChatArea() {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Image alt="logo" src="/chatLogo.png" width={200} height={200} />
        <span className="text-zinc-300">
          {" "}
          selected a chat to start messaging ...
        </span>
      </div>
    );
  }

  return (
    <>
      {selectedChat && (
        <div className="flex-1 flex flex-col justify-between">
          <Recipient />
          <Messages />
          <SendMessage />
        </div>
      )}
    </>
  );
}

export default ChatArea;
