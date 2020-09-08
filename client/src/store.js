import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userReducer } from "./reducers/userReducers";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const user = Cookie.getJSON("user") || {};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userAuth: userReducer,
  },
  preloadedState: {
    cart: { cartItems },
    userAuth: { user, loading: false },
  },
});

export default store;
