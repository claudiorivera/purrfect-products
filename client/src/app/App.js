import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Cart from "../features/cart/pages/Cart";
import Payment from "../features/cart/pages/Payment";
import Review from "../features/cart/pages/Review";
import Shipping from "../features/cart/pages/Shipping";
import EditProducts from "../features/products/pages/EditProducts";
import ProductDetails from "../features/products/pages/ProductDetails";
import ProductList from "../features/products/pages/ProductList";
import Login from "../features/user/pages/Login";
import Register from "../features/user/pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.gridContainer}>
        <Header />
        <main className={styles.main}>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/products" component={EditProducts} />
          <Route path="/products/:_id" component={ProductDetails} />
          <Route path="/cart/:_id?" component={Cart} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/review" component={Review} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
        <Footer>
          &copy; 2020 Claudio Rivera
          <span
            style={{ marginLeft: ".5rem" }}
            role="img"
            aria-label="cat with heart eyes emoji"
          >
            😻
          </span>
        </Footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
