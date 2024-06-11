"use server";
import MessageModel from "@/models/message-model";
import ChatModel from "@/models/chat-model";

export type NewMessageType = {
  text?: string;
  image?: string;
  chat?: string;
  sender?: string;
};

export const sendNewMessage = async (payload: NewMessageType) => {
  try {
    const newMessage = new MessageModel(payload);
    await newMessage.save();
    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
    });
    return { message: "message sent successfully" };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getMessagesUser = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender")
      .sort({ createdAt: 1 });
    return JSON.parse(JSON.stringify(messages));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
