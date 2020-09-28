import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../../../app/components/Button";
import OrderContainer from "../components/OrderContainer";
import SubtotalContainer from "../components/SubtotalContainer";
import CartListContainer from "../components/CartListContainer";
import CartContainer from "../components/CartContainer";
import CartItemInfoContainer from "../components/CartItemInfoContainer";
import CartItemPriceContainer from "../components/CartItemPriceContainer";

const Review = (props) => {
  const { cartItems, shippingInfo, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) props.history.push("/login?redirect=review");

  const subtotal = cartItems.reduce(
    (prevItem, curItem) => prevItem + curItem.price * curItem.qtyInCart,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.15;
  const numberOfItemsInCart = cartItems.reduce(
    (prevItem, curItem) => prevItem + curItem.qtyInCart,
    0
  );

  const handleSubmit = () => {
    props.history.push("/");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <CartContainer>
        <OrderContainer>
          <div>
            <h3>Ship To</h3>
            <div>
              {user.name}
              <br />
              {shippingInfo.address}
              <br />
              {shippingInfo.address2 ? shippingInfo.address2 : ""}
              <br />
              {shippingInfo.city}, {shippingInfo.state}{" "}
              {shippingInfo.postalCode}
            </div>
          </div>
          <div>
            <h3>Payment Method</h3>
            <div>{paymentInfo.paymentMethod}</div>
          </div>
          <div>
            <h3>Order Details</h3>
            <CartListContainer>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <CartItemInfoContainer>
                    <div>{item.name}</div>
                    <div>
                      Qty: {item.qtyInCart} @ ${item.price}
                    </div>
                  </CartItemInfoContainer>
                  <CartItemPriceContainer>
                    ${(item.price * item.qtyInCart).toFixed(2)}
                  </CartItemPriceContainer>
                </li>
              ))}
            </CartListContainer>
          </div>
        </OrderContainer>
        <SubtotalContainer>
          <h3>
            Subtotal ({numberOfItemsInCart} item
            {numberOfItemsInCart === 1 ? "" : "s"}): ${subtotal.toFixed(2)}
          </h3>
          <h3>Tax: ${tax.toFixed(2)}</h3>
          <h3>Shipping: ${shippingCost.toFixed(2)}</h3>
          <h3>Total: ${(subtotal + tax + shippingCost).toFixed(2)}</h3>
          <Button primary fullWidth onClick={handleSubmit}>
            Submit Order
          </Button>
        </SubtotalContainer>
      </CartContainer>
    </>
  );
};

export default Review;
