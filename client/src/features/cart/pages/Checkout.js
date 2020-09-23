import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const [address, setAddress] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, address2, city, state, postalCode }));
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <ul>
            <li>
              <h2>Checkout</h2>
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="address2">Address Line 2 (Optional)</label>
              <input
                type="text"
                name="address2"
                id="address2"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                required
                onChange={(e) => setState(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <button
                type="submit"
                className="button primary"
                disabled={!address || !city || !state || !postalCode}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
