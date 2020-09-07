import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
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
        <a href="login.html">Login</a>
      </div>
    </header>
  );
};

export default Header;
