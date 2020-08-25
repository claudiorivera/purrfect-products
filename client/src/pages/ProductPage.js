import React, { Fragment } from "react";
import data from "../data";
import { Link } from "react-router-dom";

const ProductPage = (props) => {
  const product = data.products.find(
    (element) => element._id === parseInt(props.match.params.id)
  );
  return (
    <Fragment>
      <div className="back-to-results">
        <Link to="/">Back to results</Link>
      </div>
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
              <strong>{product.price}</strong>
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
              Qty:{" "}
              <select name="qty" id="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li>
              <button className="button primary">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductPage;
