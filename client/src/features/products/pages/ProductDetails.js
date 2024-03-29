import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../app/components/Button";
import { fetchProductById } from "../productDetailsSlice";
import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const { _id } = props.match.params;

  useEffect(() => {
    dispatch(fetchProductById(_id));
  }, [dispatch, _id]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${_id}?qty=${qty}`);
  };

  return (
    <Fragment>
      <div className={styles.backToResults}>
        <Link to="/">Back to results</Link>
      </div>
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div className={styles.details}>
          <div className={styles.detailsImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.detailsInfo}>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numberOfReviews} Reviews)
              </li>
              <li>
                <strong>${product.price}</strong>
              </li>
              <li>
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className={styles.detailsAction}>
            <ul>
              <li>
                Price: <strong>${product.price}</strong>
              </li>
              <li>
                Status:{" "}
                {product.qtyInStock > 0 ? (
                  "In Stock"
                ) : (
                  <span>
                    Out of Stock
                    <span role="img" aria-label="sad cat emoji">
                      😿
                    </span>
                  </span>
                )}
              </li>
              <li>
                Qty:
                <select
                  value={qty}
                  name="qty"
                  id="qty"
                  onChange={(event) => {
                    setQty(parseInt(event.target.value));
                  }}
                >
                  {[...Array(product.qtyInStock).keys()].map((index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.qtyInStock > 0 && (
                  <Button primary onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
