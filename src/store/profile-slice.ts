import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile_url: "",
    user_name: "",
    _id:""

};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateNavbar: (state, action) => {
            state.profile_url = action.payload.profile_url;
            state.user_name = action.payload.user_name;
            state._id = action.payload._id;
            
        }
    }
});

export const  profileActions  = profileSlice.actions;
export default profileSlice.reducer;

