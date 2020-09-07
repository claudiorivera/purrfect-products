import { createReducer } from "@reduxjs/toolkit";

const cartReducer = createReducer(
  { cartItems: [] },
  {
    UPDATE_CART: (state, action) => {
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
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  }
);

export { cartReducer };
