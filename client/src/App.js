import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./features/products/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
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
            <Route path="/login" component={Login} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/" component={Home} exact />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
