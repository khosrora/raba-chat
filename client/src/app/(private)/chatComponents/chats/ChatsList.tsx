"use client";
import { ChatType } from "@/interfaces";
import { ChatState, setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { getAllChatsUser } from "@/server-actions/chats";
import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";

function ChatsList() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { chats }: ChatState = useSelector((state: any) => state.chat);
  const getChats = async () => {
    try {
      const res = await getAllChatsUser(currentUserData._id);
      if (res.error) throw new Error(res.error);
      dispatch(setChats(res));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!currentUserData) getChats();
  }, [currentUserData]);

  return (
    <div className="flex flex-col gap-5">
      {chats.length > 0 &&
        chats.map((chat: ChatType) => <ChatCard chat={chat} />)}
      {loading && <Spin />}
    </div>
  );
}

export default ChatsList;
