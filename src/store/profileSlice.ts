import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile_url: "",
    user_name:"",

};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateNavbar: (state, action) => {
            state.profile_url = action.payload.profile_url;
            state.user_name = action.payload.user_name;
            
            console.log(action.payload);    
        }
    }
});

export const  profileActions  = profileSlice.actions;
export default profileSlice.reducer;