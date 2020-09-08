import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartReducers";
import { userAuthReducer } from "../features/user/userReducers";
import Cookie from "js-cookie";
import productListReducer from "../features/products/productsSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";

const cartItems = Cookie.getJSON("cartItems") || [];
const user = Cookie.getJSON("user") || null;
const isLoggedIn = user ? true : false;

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userAuth: userAuthReducer,
  },
  preloadedState: {
    cart: { cartItems },
    userAuth: { user, isLoggedIn, loading: false },
  },
});

export default store;
