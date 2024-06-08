import { UserType } from "@/interfaces";
import { ChatState, setChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { createNewChat } from "@/server-actions/chats";
import { getAllUsers } from "@/server-actions/user";
import { Avatar, Button, Divider, message, Modal, Spin } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewChatModal({
  setShowNewChatModal,
  showNewChatModal,
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const { chats }: ChatState = useSelector((state: any) => state.chat);

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, SetSelectedUser] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res.error) return new Error("No User Found");
      setUsers(res);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onAddToChat = async (userID: string) => {
    try {
      setLoading(true);
      SetSelectedUser(userID);
      const res = await createNewChat({
        users: [userID, currentUserData._id],
        isGroupChat: false,
        createdBy: userID,
      });
      if (res.error) throw new Error(res.error);
      setShowNewChatModal(false);
      message.success("chat create succefully !!");
      dispatch(setChats(res));
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-xl font-bold">Create New Chat</h1>
        {loading && !selectedUser ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <div className="">
            <div className="flex flex-col gap-5">
              {users.map((user: UserType) => {
                const chatAlreadyCreated = chats.find((chat) =>
                  chat.users.find((u) => u._id === user._id)
                );
                if (user._id === currentUserData._id || chatAlreadyCreated)
                  return null;
                return (
                  <>
                    <div
                      className="flex justify-between items-center"
                      key={user._id}
                    >
                      <div className="flex justify-start items-center gap-x-2">
                        <Avatar
                          size="small"
                          src={user.profilePic}
                          className="w-10 h-10"
                        />
                        <span className="text-gray-500">{user.name}</span>
                      </div>

                      <Button
                        size="small"
                        onClick={() => onAddToChat(user._id)}
                      >
                        {" "}
                        add To Chats{" "}
                      </Button>
                    </div>
                    <Divider className="my-0 border-gray-200" />
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default NewChatModal;
