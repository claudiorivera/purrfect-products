import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];

export const updateCart = createAsyncThunk(
  "cart/updateCartStatus",
  async ({ id, qty }, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().cart;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const response = await axios.get(`/api/products/${id}`);
    return {
      _id: response.data._id,
      name: response.data.name,
      image: response.data.image,
      price: response.data.price,
      qtyInStock: response.data.qtyInStock,
      qtyInCart: qty,
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems,
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: {
    [updateCart.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [updateCart.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.cartItems = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [updateCart.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

const { reducer, actions } = cartSlice;
export const { removeFromCart } = actions;
export default reducer;
