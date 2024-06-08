import { ChatType } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: null,
  },
  reducers: {
    setChats: (state: any, actions) => {
      state.chats = actions.payload;
    },
    setSelectedChat: (state: any, actions) => {
      state.selectedChat = actions.payload;
    },
  },
});

export const { setChats, setSelectedChat } = chatSlice.actions;
export default chatSlice;

export interface ChatState {
  chats: ChatType[];
  selectedChat: ChatType | null;
}
