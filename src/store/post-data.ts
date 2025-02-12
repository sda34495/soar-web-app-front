import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateNewData: (state, action) => {
      state.posts = action.payload.data;

      // Filter out duplicates by checking the _id of the posts
      // const newPosts = action.payload.data.filter(
      //   (newPost) =>
      //     !state.posts.some((existingPost) => existingPost._id === newPost._id)
      // );

      // // Add only unique posts to the state
      // state.posts = [...state.posts, ...newPosts];
      // console.log("Updated posts in Redux:", state.posts);
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
