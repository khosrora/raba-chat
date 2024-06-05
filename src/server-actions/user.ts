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
      email: clerkUser?.emailAddresses[0].emailAddress || "",
      profilePic: clerkUser?.imageUrl,
    };
    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUserPayload));
  } catch (error: any) {
    return {
      err: error.message,
    };
  }
};
