import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar-slice";

const store = configureStore({
    reducer :{
        navbarSlice
    }
})

export default store