import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESSFUL,
  PRODUCT_LIST_FAILED,
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

export { getAllProducts };
