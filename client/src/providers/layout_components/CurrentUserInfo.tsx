import { UserType } from "@/interfaces";
import { Avatar, Button, Divider, Drawer, message, Upload } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToFirebaseAndReturnUrl } from "@/helpers/ImageUpload";
import { upadteProfileUser } from "@/server-actions/user";
import socket from "@/config/socket.io.config";

function CurrentUserInfo({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: Dispatch<SetStateAction<boolean>>;
}) {
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onLogout = async () => {
    try {
      setLoading(true);
      socket.emit("logout", currentUserData._id);
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

  const uploadProfileImage = async () => {
    try {
      setLoading(true);
      const url: string = await uploadImageToFirebaseAndReturnUrl(
        selectedFile!
      );
      const res = await upadteProfileUser(currentUserData?._id, {
        profilePic: url,
      });

      if (res.error) {
        throw new Error(res.error);
      } else {
        dispatch(SetCurrentUser(res));
        setShowCurrentUserInfo(false);
      }
      setLoading(true);
    } catch (error: any) {
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
          {!selectedFile && (
            <Avatar className="w-28 h-28" src={currentUserData?.profilePic} />
          )}
          <Upload
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            className="cursor-pointer"
            listType={selectedFile ? "picture-circle" : "text"}
            maxCount={1}
          >
            {" "}
            change profile picture{" "}
          </Upload>
        </div>
        <Divider className="my-1 border-gray-200" />
        <div className="flex flex-col gap-5">
          {getProperty("Name", currentUserData.name)}
          {getProperty("User Name", currentUserData.userName)}
          {getProperty("Id", currentUserData._id)}
          {getProperty("Joined On", currentUserData.createdAt)}
        </div>
        <div className="flex flex-col gap-y-4">
          {selectedFile && (
            <Button
              className="w-full"
              loading={loading}
              onClick={uploadProfileImage}
            >
              update Profile Picture
            </Button>
          )}
          <Button className="w-full" loading={loading} onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default CurrentUserInfo;
