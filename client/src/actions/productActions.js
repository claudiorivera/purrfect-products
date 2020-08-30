import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESSFUL,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESSFUL,
  PRODUCT_DETAILS_FAILED,
} from "../constants/productConstants";
import axios from "axios";

const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESSFUL, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAILED, payload: error.message });
  }
};

const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESSFUL, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAILED, payload: error.message });
  }
};

export { getAllProducts, getProductDetails };
