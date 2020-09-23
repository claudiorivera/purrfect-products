import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../productsSlice";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return loading === "pending" ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <ul className={styles.products}>
      {products.map((product) => (
        <li key={product._id}>
          <div className={styles.product}>
            <Link to={`/products/${product._id}`}>
              <img
                className={styles.productImage}
                src={product.image}
                alt={product.name}
              />
              <div className={styles.productName}>{product.name}</div>
            </Link>
            <div className={styles.productBrand}>{product.brand}</div>
            <div className={styles.productPrice}>${product.price}</div>
            <div className={styles.productRating}>
              {product.rating} Stars ({product.numberOfReviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
