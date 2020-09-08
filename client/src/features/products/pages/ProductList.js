import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../productsSlice";
import "./ProductList.css";

const ProductList = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    // eslint-disable-next-line
  }, []);

  return loading === "pending" ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={`/products/${product._id}`}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <div className="product-name">{product.name}</div>
            </Link>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">
              {product.rating} Stars ({product.numberOfReviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
