import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const shippingInfo = Cookie.getJSON("shippingInfo") || null;
const paymentInfo = Cookie.getJSON("paymentInfo") || null;

export const updateCart = createAsyncThunk(
  "cart/updateCartStatus",
  async (args, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().cart;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const { data } = await axios.get(`/api/products/${args._id}`);
    return {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qtyInStock: data.qtyInStock,
      qtyInCart: args.qty,
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems,
    shippingInfo,
    paymentInfo,
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      Cookie.set("pp-cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      Cookie.set("pp-shippingInfo", JSON.stringify(state.shippingInfo));
    },
    savePaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      Cookie.set("pp-paymentInfo", JSON.stringify(state.paymentInfo));
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
        Cookie.set("pp-cartItems", JSON.stringify(state.cartItems));
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
export const { removeFromCart, saveShippingInfo, savePaymentInfo } = actions;
export default reducer;
