import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  {
    user: {},
    loading: false,
  },
  {
    LOGIN_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOGIN_USER_SUCCESSFUL: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    LOGIN_USER_FAILED: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export { userReducer };
