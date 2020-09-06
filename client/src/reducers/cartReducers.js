const { ADD_TO_CART, REMOVE_FROM_CART } = require("../constants/cartConstants");

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((element) => element.id === item.id);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((element) =>
            element.id === product.id ? item : element
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export { cartReducer };
