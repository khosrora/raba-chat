import { UserType } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserData: null,
    currentUserId: "",
    onlineusers: [],
  },
  reducers: {
    SetCurrentUser: (state, action) => {
      state.currentUserData = action.payload;
    },
    SetCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    SetOnlineUsers: (state, action) => {
      state.onlineusers = action.payload;
    },
  },
});

export const { SetCurrentUser, SetCurrentUserId , SetOnlineUsers } = userSlice.actions;

export default userSlice;

export interface UserState {
  currentUserData: UserType;
  currentUserId: string;
  onlineusers: string[];
}
