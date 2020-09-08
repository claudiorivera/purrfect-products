import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import "../styles/Login.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const userAuth = useSelector((state) => state.userAuth);
  const { loading, user, error } = userAuth;

  useEffect(() => {
    if (user && user.name) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <ul>
          <li>
            <h2>Login</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
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
            <button type="submit" className="button primary">
              Log In
            </button>
          </li>
          <li>
            <Link to="/register" className="full-width text-center">
              Need an Account? Register Here
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
