import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { userAuthReducer } from "../features/user/userReducers";
import Cookie from "js-cookie";
import productListReducer from "../features/products/productsSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";

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
    userAuth: { user, isLoggedIn, loading: false },
  },
});

export default store;
