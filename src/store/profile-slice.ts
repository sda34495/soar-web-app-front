import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
};
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateUserProfile: (state, action) => {
            state.user = action.payload.data;
            // console.log("Updated user in Redux:", action.payload.data);
        }

    }
});

export const  profileActions  = profileSlice.actions;
export default profileSlice.reducer;

