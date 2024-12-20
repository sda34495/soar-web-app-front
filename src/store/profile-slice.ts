import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first_name: "",
    last_name: "",
    user_name:"",
    email:"",
    profile_url: "",

};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateNavbar: (state, action) => {
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.user_name = action.payload.user_name;
            state.profile_url = action.payload.profile_url;
            
        }
    }
});

export const  profileActions  = profileSlice.actions;
export default profileSlice.reducer;

