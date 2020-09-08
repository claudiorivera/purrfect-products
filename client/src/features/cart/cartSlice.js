import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];

export const updateCart = createAsyncThunk(
  "cart/updateCartStatus",
  async (idAndQty, { getState, requestId }) => {
    console.log(`id: ${idAndQty.id}, qty: ${idAndQty.qty}`);
    const { currentRequestId, loading } = getState().cart;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const response = await axios.get(`/api/products/${idAndQty.id}`);
    return {
      _id: response.data._id,
      name: response.data.name,
      image: response.data.image,
      price: response.data.price,
      qtyInStock: response.data.qtyInStock,
      qtyInCart: idAndQty.qty,
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
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      Cookie.set("cartItems", JSON.stringify(state.cartItems));
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
        // Check array to see if item is already in cart
        const product = state.cartItems.find(
          (item) => item._id === action.payload._id
        );
        if (product) {
          state.cartItems = state.cartItems.map((item) =>
            item._id === product._id ? action.payload : item
          );
        } else {
          state.cartItems.push(action.payload);
        }
        Cookie.set("cartItems", JSON.stringify(state.cartItems));
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
