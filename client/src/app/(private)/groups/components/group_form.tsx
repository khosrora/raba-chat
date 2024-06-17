"use client";
import React, { useState } from "react";
import { UserType } from "@/interfaces";
import { UserState } from "@/redux/userSlice";
import { Avatar, Form, message, Spin, Upload } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Checkbox, Input } from "antd";
import { Button, Flex } from "antd";
import { uploadImageToFirebaseAndReturnUrl } from "@/helpers/ImageUpload";
import { createNewChat } from "@/server-actions/chats";

function GroupForm({ users }: { users: UserType[] }) {

  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [selecteFile, setSelectFile] = useState<File>();

  const onchange = (userId: string) => {
    if (selectedUser.includes(userId)) {
      setSelectedUser(selectedUser.filter((id) => id !== userId));
    } else {
      setSelectedUser([...selectedUser, userId]);
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        groupName: values.groupName,
        bio: values.groupDesc,
        users: [...selectedUser, currentUserData._id],
        createdBy: currentUserData._id,
        isGroupChat: true,
        groupProfilePicture: "",
      };

      if (selecteFile) {
        payload.groupProfilePicture = await uploadImageToFirebaseAndReturnUrl(
          selecteFile
        );
      }
      const res = await createNewChat(payload);
      if (res.error) throw new Error("try again !!!");
      router.refresh();
      router.push("/");
      message.success('group create !!!')
      setLoading(false);
    } catch (error) {}
  };

  if (!currentUserData) return <Spin />;
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <span>select user to add group</span>
        {users.map((user: UserType) => {
          if (user._id === currentUserData._id) return null;
          return (
            <div
              key={user._id}
              className="flex justify-start items-center gap-x-4"
            >
              <Checkbox
                checked={selectedUser.includes(user._id)}
                onChange={() => onchange(user._id)}
              />
              <Avatar src={user.profilePic} className="w-8 h-8" />
              <p className="text-xs"> {user.userName} </p>
            </div>
          );
        })}
      </div>
      <div className="">
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="flex flex-col gap-y-4"
        >
          <Form.Item
            name="groupName"
            label="group name"
            rules={[{ required: true, message: "please input group name" }]}
          >
            <Input placeholder="name of group" />
          </Form.Item>
          <Form.Item name="groupDesc" label="group description">
            <Input.TextArea placeholder="geroup description" />
          </Form.Item>
          <Upload
            beforeUpload={(file) => {
              setSelectFile(file);
              return false;
            }}
            maxCount={1}
          >
            {" "}
            upload group image{" "}
          </Upload>
          <div className="flex justify-end items-center gap-x-2">
            <Button>Cancell</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create group
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default GroupForm;
