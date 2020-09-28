import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const user = Cookie.getJSON("user") || null;
const isLoggedIn = user ? true : false;

export const login = createAsyncThunk(
  "auth/loginStatus",
  async (args, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().auth;
    const { email, password } = args;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    return data;
  }
);

export const register = createAsyncThunk(
  "auth/registerStatus",
  async (args, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().auth;
    const { name, email, password, confirmPassword } = args;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
      confirmPassword,
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    loading: "idle",
    currentRequestId: undefined,
    isLoggedIn,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      Cookie.remove("pp-user");
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [login.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.user = action.payload;
        state.isLoggedIn = true;
        Cookie.set("pp-user", JSON.stringify(state.user));
        state.currentRequestId = undefined;
      }
    },
    [login.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.isLoggedIn = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [register.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [register.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.user = action.payload;
        state.isLoggedIn = true;
        Cookie.set("pp-user", JSON.stringify(state.user));
        state.currentRequestId = undefined;
      }
    },
    [register.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.isLoggedIn = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;
