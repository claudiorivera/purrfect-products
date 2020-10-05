import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const saveProduct = createAsyncThunk(
  "productList/saveProductStatus",
  async (args, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().productList;
    const { user } = getState().auth;

    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.token || ""}`,
    };

    if (args._id) {
      const { data } = await axios.put(`/api/products/${args._id}`, args, {
        headers,
      });
      return data;
    } else {
      const { data } = await axios.post("/api/products", args, {
        headers,
      });
      return data;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "productList/deleteProductStatus",
  async (_id, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().productList;
    const { user } = getState().auth;

    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const { data } = await axios.delete(`/api/products/${_id}`, {
      headers: {
        Authorization: `Bearer ${user?.token || ""}`,
      },
    });
    return data;
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
    [saveProduct.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [saveProduct.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.products = [
          ...state.products.filter(
            (product) => product._id !== action.payload._id
          ),
          action.payload,
        ];
        state.currentRequestId = undefined;
      }
    },
    [saveProduct.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
    [deleteProduct.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.products = [
          ...state.products.filter(
            (product) => product._id !== action.payload._id
          ),
        ];
        state.currentRequestId = undefined;
      }
    },
    [deleteProduct.rejected]: (state, action) => {
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
export default reducer;
