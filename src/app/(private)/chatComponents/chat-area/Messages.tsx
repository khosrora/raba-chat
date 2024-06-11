import { MessageType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { getMessagesUser } from "@/server-actions/messages";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

function Messages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  const getMessages = async () => {
    try {
      const response = await getMessagesUser(selectedChat?._id!);
      if (response.error) throw new Error("try again !!");
      setMessages(response);
      setLoading(false);
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };

  useEffect(() => {
    if (!!selectedChat) getMessages();
  }, [selectedChat]);

  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
}

export default Messages;
