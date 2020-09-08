import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const { user, isLoggedIn } = userAuth;
  return (
    <header className="header">
      <div className="brand">
        <button
          onClick={() => {
            document.querySelector(".sidebar").classList.add("open");
          }}
        >
          &#9776;
        </button>
        <Link to="/">Purrfect Products!</Link>
      </div>
      <div className="header-links">
        <a href="cart.html">Cart</a>
        {isLoggedIn ? (
          <Link to="/profile">{user.name}</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
