export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  userName: string;
  email: string;
  profilePic: string;
  bio: string;
  createdAt: string;
  updateAt: string;
}

export interface MessageType {
  _id: string;
  chat: string[];
  sender: string[];
  content: string;
  images: string;
  readBy: string;
  createdAt: string;
  updateAt: string;
}

export interface ChatType {
  _id: string;
  users: UserType[];
  createdBy: UserType;
  lastMessage: MessageType;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  bio: string;
  groupAdmins: UserType[];
  unreadsCounts: {};
  createdAt: string;
  updateAt: string;
}
