import React, { useRef, useState } from "react";
import { Button, Input, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { NewMessageType, sendNewMessage } from "@/server-actions/messages";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/userSlice";
import { ChatState } from "@/redux/chatSlice";
import { getAllChatsUser } from "@/server-actions/chats";

function SendMessage() {
  const [text, setText] = useState<string>("");

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSend = async () => {
    if (!text) return;
    try {
      const dbPayload: NewMessageType = {
        text,
        image: "",
        chat: selectedChat?._id,
        sender: currentUserData._id,
      };
      const res = await sendNewMessage(dbPayload);
      if (res.error) throw new Error("try again ...");
      setText("");
    } catch (error: any) {
      message.error(error.message);
    } finally {
    }
  };

  return (
    <div className="p-2 bg-zinc-100 border-0 border-t border-zinc-200 border-solid flex items-center gap-5">
      <div className="">emoji purpose</div>
      <div className="flex-1">
        <Input
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          placeholder="type a message ..."
          className="bg-white rounded-md py-2"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        />
      </div>
      <Button
        type="primary"
        dir="rtl"
        icon={<SendOutlined />}
        onClick={() => onSend()}
      >
        send
      </Button>
    </div>
  );
}

export default SendMessage;
