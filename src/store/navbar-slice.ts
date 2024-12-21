import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "",
    
};


const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        updateNavbar: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            console.log(action.payload);    
        }
    }
});

export const  navbarActions  = navbarSlice.actions;
export default navbarSlice.reducer;