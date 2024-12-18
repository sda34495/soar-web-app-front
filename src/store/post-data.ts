import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateNewData: (state, action) => {
        console.log("hello")
    //     console.log("Payload",action.payload)
    //   state.posts = action.payload.data;
    //   console.log("Updated posts in Redux:", state.posts)
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
