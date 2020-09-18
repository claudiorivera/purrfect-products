import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProductList from "../features/products/pages/ProductList";
import ProductDetails from "../features/products/pages/ProductDetails";
import EditProducts from "../features/products/pages/EditProducts";
import Cart from "../features/cart/pages/Cart";
import Login from "../features/user/pages/Login";
import Register from "../features/user/pages/Register";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <main className="main">
          <div className="content">
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products" component={EditProducts} />
            <Route path="/products/:_id" component={ProductDetails} />
            <Route path="/cart/:_id?" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
