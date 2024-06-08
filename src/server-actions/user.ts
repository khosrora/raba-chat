"use server";
import { connectToMongodb } from "@/config/db.config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectToMongodb();

export const curentUserFromMongoDb = async () => {
  try {
    const clerkUser = await currentUser();

    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + "  " + clerkUser?.lastName,
      userName: clerkUser?.username,
      email: clerkUser?.emailAddresses[0] || "",
      profilePic: clerkUser?.imageUrl,
    };
    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      err: error.message,
    };
  }
};

export const upadteProfileUser = async (userId: string, payload: any) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error: any) {
    return {
      err: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error: any) {
    return {
      err: error.message,
    };
  }
};
