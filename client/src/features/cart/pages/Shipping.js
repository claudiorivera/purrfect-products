import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Button from "../../../app/components/Button";
import Container from "../../../app/components/Container";
import Form from "../../../app/components/Form";

const Shipping = (props) => {
  const [address, setAddress] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) props.history.push("/login?redirect=shipping");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, address2, city, state, postalCode }));
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <Container>
        <Form onSubmit={handleSubmit}>
          <ul>
            <li>
              <h2>Shipping</h2>
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
              <Button
                primary
                type="submit"
                disabled={!address || !city || !state || !postalCode}
              >
                Continue
              </Button>
            </li>
          </ul>
        </Form>
      </Container>
    </div>
  );
};

export default Shipping;
