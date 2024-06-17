"use client";

import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import NewChatModal from "./NewChatModal";
import { Input } from "antd";
const { Search } = Input;
import { useRouter } from "next/navigation";

function ChatsHeader() {
  const router = useRouter();
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      label: "new chat",
      key: "1",
      onClick: () => setShowNewChatModal(true),
    },
    {
      label: "new group",
      key: "2",
      onClick: () => router.push("/groups/create_group"),
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-600 uppercase">
          {" "}
          MY Chats{" "}
        </h1>
        <div className="">
          <Dropdown.Button menu={{ items }} size="small">
            New
          </Dropdown.Button>
        </div>
      </div>

      <Search
        placeholder="search chats"
        allowClear
        // onSearch={onSearch}
        className="my-4 focus:outline-none"
      />

      {showNewChatModal && (
        <NewChatModal
          showNewChatModal={showNewChatModal}
          setShowNewChatModal={setShowNewChatModal}
        />
      )}
    </div>
  );
}

export default ChatsHeader;
