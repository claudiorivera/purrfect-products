import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";

const navLinks = [
  {
    url: "/cart",
    title: "Cart",
  },
  {
    url: "/products",
    title: "Products Admin",
  },
];

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user, isLoggedIn } = auth;
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
        {navLinks.map((link, index) => (
          <Link key={index} to={link.url}>
            {link.title}
          </Link>
        ))}
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
