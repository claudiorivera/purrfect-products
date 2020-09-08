import { createReducer } from "@reduxjs/toolkit";

const productDetailsReducer = createReducer(
  { product: {}, loading: false },
  {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    PRODUCT_DETAILS_SUCCESSFUL: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    PRODUCT_DETAILS_FAILED: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export { productDetailsReducer };
