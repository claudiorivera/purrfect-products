import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";
import productListReducer from "../features/products/productsSlice";
import authReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
