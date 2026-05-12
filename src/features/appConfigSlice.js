import { createSlice } from "@reduxjs/toolkit";

const appConfig = JSON.parse(localStorage.getItem("app_config"));

const initialState = {
    config: appConfig || null,
};

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState,
    reducers: {
        setAppConfig: (state, action) => {
            state.config = action.payload;
            localStorage.setItem("app_config", JSON.stringify(action.payload));
        },
    },
});

export const { setAppConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;
