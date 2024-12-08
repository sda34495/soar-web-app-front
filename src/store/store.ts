import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar-slice";
import loaderSlice from "./loader-slice";

const store = configureStore({
    reducer :{
        navbarSlice,
        loaderSlice,
    }
})

export default store