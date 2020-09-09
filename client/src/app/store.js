import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/user/userSlice";
import productListReducer from "../features/products/productsSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
