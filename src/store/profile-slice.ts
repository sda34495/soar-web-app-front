import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  notifications: [],
  newNotification: false
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = action.payload.data;
    },

    appendNotifications: (state, action) => {
      state.notifications = [...state.notifications, action.payload.data];
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload.data;
    },
    setNewNotification: (state, action) => {
      state.newNotification = action.payload.data;
    }
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
