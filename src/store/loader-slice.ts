import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: 0,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        endLoading: (state,action) => {
            state.isLoading = action.payload;
            // console.log(action.payload);
        },
       
    },
});

export const  endLoadingAction  = loaderSlice.actions;
export default loaderSlice.reducer;