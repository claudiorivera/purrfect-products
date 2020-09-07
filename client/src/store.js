import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { usersReducer } from "./reducers/usersReducers";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const user = Cookie.getJSON("user") || null;

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
  preloadedState: { cart: { cartItems }, users: { user } },
});

export default store;
