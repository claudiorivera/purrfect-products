import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
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
            <button type="submit" className="button primary">
              Log In
            </button>
          </li>
          <li>Need an account?</li>
          <li>
            <Link to="/register" className="button full-width">
              Register
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
