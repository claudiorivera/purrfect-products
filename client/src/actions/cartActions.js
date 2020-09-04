import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_FAILED,
} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: ADD_TO_CART_REQUEST,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        qtyInStock: data.qtyInStock,
        qty,
      },
    });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILED, payload: error.message });
  }
};

export { addToCart };
