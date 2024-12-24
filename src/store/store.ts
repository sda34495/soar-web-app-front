import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar-slice";
import loaderSlice from "./loader-slice";
import profileSlice from "./profile-slice";
import postSlice from "./post-data";

const store = configureStore({
  reducer: {
    navbarSlice,
    loaderSlice,
    profileSlice,
    postSlice,
  },
});

export default store;
