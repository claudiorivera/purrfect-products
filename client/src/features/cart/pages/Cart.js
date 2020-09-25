import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeFromCart } from "../cartSlice";
import { Link } from "react-router-dom";
import Button from "../../../app/components/Button";
import OrderContainer from "../components/OrderContainer";
import CartContainer from "../components/CartContainer";
import SubtotalContainer from "../components/SubtotalContainer";
import CartListContainer from "../components/CartListContainer";
import CartItemInfoContainer from "../components/CartItemInfoContainer";
import CartItemPriceContainer from "../components/CartItemPriceContainer";

const Cart = (props) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { _id } = props.match.params;
  const dispatch = useDispatch();
  const qtyInCart = parseInt(props.location.search.split("=")[1]);

  useEffect(() => {
    if (_id) {
      dispatch(updateCart({ _id, qty: qtyInCart }));
    }
  }, [_id, qtyInCart, dispatch]);

  const handleRemoveFromCart = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleCheckOut = () => {
    props.history.push("/login?redirect=shipping");
  };

  return (
    <CartContainer>
      <OrderContainer>
        <h3>Shopping Cart</h3>
        <CartListContainer>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item._id}>
                <img src={item.image} alt={item.name} />
                <CartItemInfoContainer>
                  <div>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    <label htmlFor="qtyInCart">Qty:</label>
                    <select
                      name="qtyInCart"
                      id="qtyInCart"
                      value={item.qtyInCart}
                      onChange={(e) =>
                        dispatch(
                          updateCart({
                            _id: item._id,
                            qty: parseInt(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.qtyInStock).keys()].map((index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <Button
                      small
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove From Cart
                    </Button>
                  </div>
                </CartItemInfoContainer>
                <CartItemPriceContainer>${item.price}</CartItemPriceContainer>
              </li>
            ))
          )}
        </CartListContainer>
      </OrderContainer>
      <SubtotalContainer>
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
        <Button primary fullWidth onClick={handleCheckOut}>
          Proceed to Checkout
        </Button>
      </SubtotalContainer>
    </CartContainer>
  );
};

export default Cart;
