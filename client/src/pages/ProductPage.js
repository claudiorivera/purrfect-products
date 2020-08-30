import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../actions/productActions";

const ProductPage = (props) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(props.match.params.id));
  }, []);

  return (
    <Fragment>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
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
              <li>Status: {product.status}</li>
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
                <button className="button primary">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductPage;
