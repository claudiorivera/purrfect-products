import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const user = Cookie.getJSON("user") || null;
const isLoggedIn = user ? true : false;

export const login = createAsyncThunk(
  "userAuth/loginStatus",
  async (args, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().userAuth;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const { data } = await axios.post("/api/users/login", {
      email: args.email,
      password: args.password,
    });
    return data;
  }
);

const cartSlice = createSlice({
  name: "userAuth",
  initialState: {
    user,
    loading: "idle",
    currentRequestId: undefined,
    isLoggedIn,
    error: null,
  },
  reducers: {},
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
        Cookie.set("user", JSON.stringify(state.user));
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
  },
});

const { reducer } = cartSlice;
export default reducer;
