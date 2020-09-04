import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button
              onClick={() => {
                document.querySelector(".sidebar").classList.add("open");
              }}
            >
              &#9776;
            </button>
            <Link to="/">Purr-fect Products!</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button
            className="sidebar-close-button"
            onClick={() => {
              document.querySelector(".sidebar").classList.remove("open");
            }}
          >
            X
          </button>
          <ul>
            <li>
              <a href="/categories/toys">Toys</a>
            </li>
            <li>
              <a href="/categories/food">Food</a>
            </li>
            <li>
              <a href="/categories/miscellaneous">Miscellaneous</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/products/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/" component={Home} exact />
          </div>
        </main>
        <footer className="footer">
          All rights reserved
          <span role="img" aria-label="cat with heart eyes emoji">
            😻
          </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
