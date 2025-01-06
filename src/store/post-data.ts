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
        console.log("Payload",action.payload)
      state.posts = action.payload.data;
      console.log("Updated posts in Redux:", state.posts)
    },
    updateLike: (state, action) => {
      const { postId, selfLiked, likes } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likes = likes;
        state.posts[postIndex].self_liked = selfLiked;
      }
    },
    
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
  