import styles from "./App.module.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProductList from "../features/products/pages/ProductList";
import ProductDetails from "../features/products/pages/ProductDetails";
import EditProducts from "../features/products/pages/EditProducts";
import Cart from "../features/cart/pages/Cart";
import Checkout from "../features/cart/pages/Checkout";
import Login from "../features/user/pages/Login";
import Register from "../features/user/pages/Register";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Payment from "../features/cart/pages/Payment";
import Order from "../features/cart/pages/Order";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.gridContainer}>
        <Header />
        <Sidebar />
        <main className={styles.main}>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/products" component={EditProducts} />
          <Route path="/products/:_id" component={ProductDetails} />
          <Route path="/cart/:_id?" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/order" component={Order} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
