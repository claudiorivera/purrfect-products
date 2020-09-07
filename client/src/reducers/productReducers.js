import { createReducer } from "@reduxjs/toolkit";

const productListReducer = createReducer(
  {
    products: [],
    loading: false,
  },
  {
    PRODUCT_LIST_REQUEST: (state, action) => {
      state.loading = true;
    },
    PRODUCT_LIST_SUCCESSFUL: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    PRODUCT_LIST_FAILED: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

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

export { productListReducer, productDetailsReducer };
