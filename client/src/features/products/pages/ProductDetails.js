import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../productDetailsSlice";
import "./ProductDetails.css";

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  return (
    <Fragment>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="details-info">
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
          <div className="details-action">
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
                  <button className="button primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
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
