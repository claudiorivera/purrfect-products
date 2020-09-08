import { createReducer } from "@reduxjs/toolkit";

const userAuthReducer = createReducer(
  {
    user: {},
    loading: false,
    isLoggedIn: false,
  },
  {
    LOGIN_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    LOGIN_USER_SUCCESSFUL: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    LOGIN_USER_FAILED: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  }
);

export { userAuthReducer };
