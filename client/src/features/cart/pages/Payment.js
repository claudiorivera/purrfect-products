import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../app/components/Button";
import Container from "../../../app/components/Container";
import Form from "../../../app/components/Form";
import { savePaymentInfo } from "../cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) props.history.push("/login?redirect=payment");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentInfo({ paymentMethod }));
    props.history.push("/review");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Container>
        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Container>
    </div>
  );
};

export default Payment;
