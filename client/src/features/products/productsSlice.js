import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "productList/fetchAllProductsStatus",
  async (_, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().productList;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const response = await axios.get("/api/products");
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "productList",
  initialState: {
    products: [],
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.products = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchAllProducts.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

const { reducer } = productsSlice;
// export const { fetchAllProducts } = actions;
export default reducer;
