import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductById = createAsyncThunk(
  "productDetails/fetchProductByIdStatus",
  async (_id, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().productDetails;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const response = await axios.get(`/api/products/${_id}`);
    return response.data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProductById.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchProductById.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.product = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchProductById.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

const { reducer } = productDetailsSlice;
export default reducer;
