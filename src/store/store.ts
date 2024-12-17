import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar-slice";
import loaderSlice from "./loader-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
    reducer :{
        navbarSlice,
        loaderSlice,
        profileSlice,
    }
})

export default store