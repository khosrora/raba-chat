"use client";
import React, { useEffect, useState } from "react";
import { curentUserFromMongoDb } from "@/server-actions/user";
import { Avatar, message, Spin } from "antd";
import { UserType } from "@/interfaces";
import CurrentUserInfo from "./CurrentUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { LoadingOutlined } from "@ant-design/icons";

function Header() {
  const dispatch = useDispatch();

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const res = await curentUserFromMongoDb();
      if (res.error) throw new Error(res.error);
      dispatch(SetCurrentUser(res as UserType));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="bg-[#EEEEEE] w-full px-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold uppercase">Raba Chat</h1>
      {currentUserData ? (
        <>
          <div className="flex gap-5 items-center">
            <span className="font-semibold">{currentUserData?.userName}</span>
            <Avatar
              className="cursor-pointer"
              onClick={() => setShowCurrentUserInfo(true)}
              src={currentUserData?.profilePic}
            />
          </div>
          {showCurrentUserInfo && (
            <CurrentUserInfo
              showCurrentUserInfo={showCurrentUserInfo}
              setShowCurrentUserInfo={setShowCurrentUserInfo}
            />
          )}
        </>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      )}
    </div>
  );
}

export default Header;
