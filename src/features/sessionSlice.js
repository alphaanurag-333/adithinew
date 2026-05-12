// src/features/session/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: { expired: false },
  reducers: {
    sessionExpired: (state) => {
      state.expired = true;
    },
    resetSession: (state) => {
      state.expired = false;
    },
  },
});

export const { sessionExpired, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
