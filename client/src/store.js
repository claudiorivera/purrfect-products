import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./reducers/productReducers";

const store = configureStore({ reducer: { productList: productListReducer } });

export default store;
