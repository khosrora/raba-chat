import { UserType } from "@/interfaces";
import UserModel from "@/models/user-model";
import Link from "next/link";
import React from "react";
import GroupForm from "../components/group_form";
import {  Spin } from "antd";

async function page() {
  const users: UserType[] = await UserModel.find({});

  return (
    <div className="p-4">
      <Link
        href="/"
        className="text-zinc-800 border-solid border-zinc-600 text-center py-2 px-4 no-underline"
      >
        Back to chats
      </Link>
      <h1 className="mt-4 text-lg text-zinc-700">create group chat</h1>

      {
        !!users ?
        <GroupForm users={JSON.parse(JSON.stringify(users))} />
        :
        <Spin />
      }
    </div>
  );
}

export default page;
