import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const qtyInCart = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qtyInCart));
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckOut = () => {
    props.history.push("/signing?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item._id}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      name="qtyInCart"
                      id="qtyInCart"
                      value={item.qtyInCart}
                      onChange={(e) =>
                        dispatch(addToCart(item._id, parseInt(e.target.value)))
                      }
                    >
                      {[...Array(item.qtyInStock).keys()].map((index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal (
          {cartItems.reduce(
            (prevItem, curItem) => prevItem + curItem.qtyInCart,
            0
          )}{" "}
          items): $
          {cartItems.reduce(
            (prevItem, curItem) => prevItem + curItem.price * curItem.qtyInCart,
            0
          )}
        </h3>
        <button
          className="button primary full-width"
          disabled={cartItems.length === 0}
          onClick={handleCheckOut}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
