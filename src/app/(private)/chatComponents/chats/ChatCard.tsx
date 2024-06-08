import { ChatType } from "@/interfaces";
import { ChatState, setSelectedChat } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatCard({ chat }: { chat: ChatType }) {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  //   #TODO fixed items
  let chatName = "";
  let chatImage = "";
  let lastMessage = "";
  let lstMessageSenderName = "";
  let lastMessageTime = "";

  if (chat.isGroupChat) {
    chatName = chat.groupName;
  } else {
    const reciepent = chat.users.find(
      (user) => user._id !== currentUserData._id
    );
    chatName = reciepent?.name!;
    chatImage = reciepent?.profilePic!;
  }

  const isSelected = selectedChat?._id === chat._id;

  return (
    <div
      className={`flex justify-between hover:bg-zinc-100 p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-zinc-100" : ""
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex gap-3 items-center">
        <Avatar size="small" src={chatImage} className="w-10 h-10" />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div className=""></div>
    </div>
  );
}

export default ChatCard;
