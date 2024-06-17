import { UserType } from "@/interfaces";
import { ChatState } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { Drawer, Avatar, Divider } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

function RecipientInfo({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const { selectedChat }: ChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
    chatImage = selectedChat.groupProfilePicture;
  } else {
    const respi: any = selectedChat?.users.filter(
      (user) => user._id !== selectedChat._id
    );
    chatName = respi.name!;
    chatImage = respi.profilePic!;
  }

  return (
    <Drawer onClose={() => setShow(false)} open={show} title={chatName}>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center">
          <Avatar className="w-28 h-28" src={chatImage} />
        </div>
        <p>{chatName}</p>
      </div>
      <Divider className="my-1 border-gray-200" />
      {!!selectedChat?.isGroupChat && (
        <div className="flex flex-col justify-start items-start gap-y-4">
          {<span className="text-xs text-zinc-700">{selectedChat.users.length} Members</span>}
          {selectedChat.users.map((user: UserType) => (
            <div key={user._id} className="flex justify-center items-center gap-x-2">
              <Avatar className="w-8 h-8" src={user.profilePic} />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

export default RecipientInfo;
