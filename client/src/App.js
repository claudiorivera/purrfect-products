import React from "react";
import "./App.css";
import data from "./data";

function App() {
  return (
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
          <a href="index.html">Purr-fect Products!</a>
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
            <a href="#">Toys</a>
          </li>
          <li>
            <a href="#">Food</a>
          </li>
          <li>
            <a href="#">Miscellaneous</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <ul className="products">
            {data.products.map((product) => (
              <li>
                <div className="product">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product-name">
                    <a href="#">{product.name}</a>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                    {product.rating} Stars ({product.numReviews} Reviews)
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer">
        All rights reserved <span>😻</span>
      </footer>
    </div>
  );
}

export default App;
