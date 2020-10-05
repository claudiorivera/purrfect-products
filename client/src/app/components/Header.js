import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/user/userSlice";
import "./Header.css";

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
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;
  const dispatch = useDispatch();

  const redirect = location.pathname.slice(1) || "/";

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="header">
      <div className="brand">
        <Link to="/">Purrfect Products!</Link>
      </div>
      <div className="header-links">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.url}>
            {link.title}
          </Link>
        ))}
        {isLoggedIn ? (
          <Link to={`/login?redirect=${redirect}`} onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to={`/login?redirect=${redirect}`}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
