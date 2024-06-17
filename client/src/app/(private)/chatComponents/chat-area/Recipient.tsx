import { ChatState } from "@/redux/chatSlice";
import { Avatar } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import RecipientInfo from "./RecipientInfo";

function Recipient() {
  const [show, setShow] = useState<boolean>(false);
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
  } else {
    const reciepent = selectedChat?.users.find(
      (user) => user._id !== selectedChat._id
    );
    chatName = reciepent?.name!;
    chatImage = reciepent?.profilePic!;
  }

  return (
    <div className="flex justify-between items-center p-2 border-0 border-b border-zinc-200 border-solid cursor-pointer">
      <div onClick={() => setShow(true)} className="flex gap-3 items-center">
        <Avatar size="small" src={chatImage} className="w-10 h-10" />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div className=""></div>
      {show && <RecipientInfo show={show} setShow={setShow} />}
    </div>
  );
}

export default Recipient;
