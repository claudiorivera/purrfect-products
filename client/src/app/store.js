import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import userAuthReducer from "../features/user/userSlice";
import productListReducer from "../features/products/productsSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userAuth: userAuthReducer,
  },
});

export default store;
