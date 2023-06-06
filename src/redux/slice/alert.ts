import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GithubInitialState = {
    isShowAlert: boolean;
};

const initialState: GithubInitialState = {
    isShowAlert: false,
};

export const configSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setIsShowAlert: (state, action: PayloadAction<boolean>) => {
            state.isShowAlert = action.payload;
        },
    },
});

export const { setIsShowAlert } = configSlice.actions;

export default configSlice.reducer;
