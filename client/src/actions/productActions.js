import axios from "axios";

const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST", payload: productId });
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESSFUL", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAILS_FAILED", payload: error.message });
  }
};

export { getProductDetails };
