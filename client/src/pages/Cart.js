import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    // dispatch(removeFromCart(productId));
    console.log(`removing ${productId}`);
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
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select name="qty" id="qty">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleRemoveFromCart(item.product)}
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
          {cartItems.reduce((prevItem, curItem) => prevItem + curItem.qty, 0)}{" "}
          items): $
          {cartItems.reduce(
            (prevItem, curItem) => prevItem + curItem.price * curItem.qty,
            0
          )}
        </h3>
        <button className="button primary" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
