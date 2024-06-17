import { formatDate } from "@/helpers/dateFormats";
import { MessageType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function Message({ message }: { message: MessageType }) {
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  const isLoggedInUseMessage = message.sender._id === currentUserData._id;

  if (isLoggedInUseMessage) {
    return (
      <div className="flex justify-end gap-x-2">
        <div className="flex flex-col gap-0">
          <div className="bg-zinc-900 text-white py-2 px-2 text-xs rounded-md space-y-0">
            <p>{message.text}</p>
          </div>
          <span className="text-zinc-400 text-xs">
            {formatDate(message.createdAt)}
          </span>
        </div>
        <Avatar src={message.sender.profilePic} className="w-6 h-6" />
      </div>
    );
  } else {
    return (
      <div className="flex justify-start gap-x-2">
        <Avatar src={message.sender.profilePic} className="w-6 h-6" />
        <div className="flex flex-col gap-0">
          <div className="bg-zinc-100 text-zinc-900 py-2 px-2 text-xs rounded-md space-y-0">
            <span className="text-xs text-blue-500">
              {message.sender.name}
            </span>
            <p>{message.text}</p>
          </div>
          <span className="text-zinc-400 text-xs">
            {formatDate(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
