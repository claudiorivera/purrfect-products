import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../userSlice";
import styles from "./Register.module.css";
import { Button } from "../../../app/components/Button";

const Register = (props) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const dispatch = useDispatch();
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
    dispatch(register({ name, email, password }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <ul>
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading === "pending" && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
          <li>
            <Button
              primary
              type="submit"
              disabled={
                password !== confirmPassword || !name || !email || !password
              }
            >
              Register
            </Button>
          </li>
          <li>
            <Link
              to={redirect === "/" ? "login" : `login?redirect=${redirect}`}
              className="text-center"
            >
              Already registered? Login here.
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
