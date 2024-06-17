import { formatDate } from "@/helpers/dateFormats";
import { ChatType } from "@/interfaces";
import { ChatState, setSelectedChat } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatCard({ chat }: { chat: ChatType }) {
  const dispatch = useDispatch();
  const { currentUserData, onlineusers }: UserState = useSelector(
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

  if (chat.lastMessage) {
    lastMessage = chat.lastMessage.text;
    lstMessageSenderName =
      chat.lastMessage.sender._id === currentUserData?._id
        ? "you: "
        : `${chat.lastMessage.sender.name.split(" ")[0]} :`;
    lastMessageTime = formatDate(chat.lastMessage.createdAt);
  }

  const isSelected = selectedChat?._id === chat._id;

  const onlineIndicator = () => {
    if (chat.isGroupChat) return null;
    const recId = chat.users.find(
      (user) => user._id !== currentUserData._id
    )?._id;
    if (onlineusers.includes(recId!)) {
      return <div className="w-2 h-2 rounded-full bg-green-700"></div>;
    }
  };

  const unreadCounts = () => {
    if (!chat.unreadsCounts || !chat.unreadsCounts[currentUserData?._id!]) {
      return null;
    }
    return (
      <div className="bg-green-700 h-5 w-5 rounded-full flex justify-center items-center">
        <span className="text-white text-xs">
          {chat.unreadsCounts[currentUserData?._id!]}{" "}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`flex justify-between hover:bg-zinc-100 p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-zinc-100" : ""
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex gap-3 items-center">
        <Avatar size="small" src={chatImage} className="w-10 h-10" />
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-500 text-sm flex justify-start items-center gap-x-2">
            {chatName}
            {onlineIndicator()}
          </span>
          <span className="text-gray-500 text-[10px]">
            {lstMessageSenderName} {lastMessage}
          </span>
        </div>
      </div>
      <div className="">
        {unreadCounts()}
        <span className="text-xs text-zinc-400">{lastMessageTime}</span>
      </div>
    </div>
  );
}

export default ChatCard;
