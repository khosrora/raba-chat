"use client";
import React, { useEffect, useState } from "react";
import { curentUserFromMongoDb } from "@/server-actions/user";
import { Avatar, message } from "antd";
import { UserType } from "@/interfaces";
import CurrentUserInfo from "./CurrentUserInfo";

function Header() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const res = await curentUserFromMongoDb();
      if (res.error) throw new Error(res.error);
      setCurrentUser(res);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    currentUser && (
      <div className="bg-[#EEEEEE] w-full px-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Raba Chat</h1>
        <div className="flex gap-5 items-center">
          <span className="font-semibold">{currentUser?.userName}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => setShowCurrentUserInfo(true)}
            src={currentUser?.profilePic}
          />
        </div>
        {showCurrentUserInfo && (
          <CurrentUserInfo
            showCurrentUserInfo={showCurrentUserInfo}
            setShowCurrentUserInfo={setShowCurrentUserInfo}
            currentUserInfo={currentUser}
          />
        )}
      </div>
    )
  );
}

export default Header;
