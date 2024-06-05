import { UserType } from "@/interfaces";
import { Avatar, Button, Divider, Drawer, message } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

function CurrentUserInfo({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
  currentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: Dispatch<SetStateAction<boolean>>;
  currentUserInfo: UserType;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const getProperty = (key: string, value: string): any => {
    return (
      <div className="flex">
        <span className="font-semibold text-gray-700">{key} :</span>
        <span className="font-semibold text-gray-600">{value}</span>
      </div>
    );
  };

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      message.success("logged out successfully");
      setShowCurrentUserInfo(false);
      router.push("/sign-in");
    } catch (error) {
      message.error("try again !!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="user info"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          <Avatar className="w-28 h-28" src={currentUserInfo?.profilePic} />
          <p className="text-gray-400">change profile picture</p>
        </div>
        <Divider className="my-1 border-gray-200" />
        <div className="flex flex-col gap-5">
          {getProperty("Name", currentUserInfo.name)}
          {getProperty("User Name", currentUserInfo.userName)}
          {getProperty("Id", currentUserInfo._id)}
          {getProperty("Joined On", currentUserInfo.createdAt)}
        </div>
        <div className="">
          <Button className="w-full" loading={loading} onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default CurrentUserInfo;
