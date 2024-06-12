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

    const existingChat = await ChatModel.findById(payload.chat);
    const existingUnReadCounts = existingChat?.unreadsCounts;

    existingChat?.users.forEach((user: any) => {
      const userIdInString = user.toString();
      if (userIdInString !== payload.sender) {
        existingUnReadCounts[userIdInString] =
          (existingUnReadCounts[userIdInString] || 0) + 1;
      }
    });

    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
      unreadsCounts: existingUnReadCounts,
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

export const readAllMessages = async ({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) => {
  try {
    await MessageModel.updateMany(
      {
        chat: chatId,
        readBy: {
          $nin: [userId],
        },
      },
      {
        $addToSet: { readBy: userId },
      }
    );

    const existingChat = await ChatModel.findById(chatId);
    const existingCounts = existingChat?.unreadsCounts;
    const newReadCounts = { ...existingCounts, [userId]: 0 };
    await ChatModel.findByIdAndUpdate(chatId, {
      unreadsCounts: newReadCounts,
    });

    return { messages: "Messages marked as read" };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
