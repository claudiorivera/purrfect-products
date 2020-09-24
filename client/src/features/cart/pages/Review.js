import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import styles from "./Review.module.css";
import Button from "../../../app/components/Button";
import SubtotalContainer from "../components/SubtotalContainer";
import CartListContainer from "../components/CartListContainer";

const Review = (props) => {
  const { cartItems, shippingInfo, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const subtotal = cartItems.reduce(
    (prevItem, curItem) => prevItem + curItem.price * curItem.qtyInCart,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.15;

  const handleSubmit = () => {
    props.history.push("/");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={styles.review}>
        <div className={styles.orderInfo}>
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
                  <div className={styles.cartName}>
                    <div>{item.name}</div>
                    <div>Qty: {item.qtyInCart}</div>
                  </div>
                  <div className={styles.cartPrice}>${item.price}</div>
                </li>
              ))}
            </CartListContainer>
          </div>
        </div>
        <SubtotalContainer>
          <h3>
            Subtotal (
            {cartItems.reduce(
              (prevItem, curItem) => prevItem + curItem.qtyInCart,
              0
            )}{" "}
            items): ${subtotal.toFixed(2)}
          </h3>
          <h3>Tax: ${tax.toFixed(2)}</h3>
          <h3>Shipping: ${shippingCost.toFixed(2)}</h3>
          <h3>Total: ${(subtotal + tax + shippingCost).toFixed(2)}</h3>
          <Button primary fullWidth onClick={handleSubmit}>
            Submit Order
          </Button>
        </SubtotalContainer>
      </div>
    </>
  );
};

export default Review;
