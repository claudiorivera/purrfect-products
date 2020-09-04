const { ADD_TO_CART_REQUEST } = require("../constants/cartConstants");

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      const item = action.payload;
      const product = state.cartItems.find(
        (element) => element.product === item.product
      );
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((element) =>
            element.product === product.product ? item : element
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    default:
      return state;
  }
};

export { cartReducer };
