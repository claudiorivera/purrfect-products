import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../userSlice";
import { Button } from "../../../app/components/Button";
import { Container } from "../../../app/components/Container";
import { Form } from "../../../app/components/Form";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push(redirect);
    }
  }, [isLoggedIn, props.history, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <ul>
          <li>
            <h2>Login</h2>
          </li>
          <li style={{ margin: 0 }}>
            {loading === "pending" && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <Button primary type="submit">
              Log In
            </Button>
          </li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : `register?redirect=${redirect}`
              }
              className="text-center"
            >
              Need an Account? Register Here
            </Link>
          </li>
        </ul>
      </Form>
    </Container>
  );
};

export default Login;
