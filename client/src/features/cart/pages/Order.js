import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import styles from "./Order.module.css";
import { Button } from "../../../app/components/Button";

const Order = (props) => {
  const { cartItems, shippingInfo, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    props.history.push("/");
  };

  return (
    <div>
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className={styles.order}>
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
            <ul className={styles.cartListContainer}>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.cartImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.cartName}>
                    <div>{item.name}</div>
                    <div>Qty: {item.qtyInCart}</div>
                  </div>
                  <div className={styles.cartPrice}>${item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.orderAction}>
          <h3>
            Subtotal (
            {cartItems.reduce(
              (prevItem, curItem) => prevItem + curItem.qtyInCart,
              0
            )}{" "}
            items): $
            {cartItems.reduce(
              (prevItem, curItem) =>
                prevItem + curItem.price * curItem.qtyInCart,
              0
            )}
          </h3>
          <Button primary fullWidth onClick={handleSubmit}>
            Submit Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
