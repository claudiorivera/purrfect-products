import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentInfo } from "../cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import styles from "./Payment.module.css";
import { Button } from "../../../app/components/Button";
import { Container } from "../../../app/components/Container";

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentInfo({ paymentMethod }));
    props.history.push("/order");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Container>
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
          <ul>
            <li>
              <h2>Payment Method</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="PayPal"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">PayPal</label>
              </div>
            </li>
            <li>
              <Button primary type="submit" disabled={!paymentMethod}>
                Continue
              </Button>
            </li>
          </ul>
        </form>
      </Container>
    </div>
  );
};

export default Payment;
