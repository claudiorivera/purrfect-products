import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../productsSlice";
import "./AddProduct.css";

const AddProduct = (props) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [qtyInStock, setQtyInStock] = useState(null);
  const [price, setPrice] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        name,
        image,
        brand,
        category,
        description,
        qtyInStock,
        price,
      })
    );
    props.history.push("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <ul>
          <li>
            <h2>Add Product</h2>
          </li>
          <li>
            {loading === "pending" && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              required
              onChange={(e) => setImage(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              required
              onChange={(e) => setBrand(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="qtyInStock">Qty In Stock</label>
            <input
              type="number"
              name="qtyInStock"
              id="qtyInStock"
              required
              onChange={(e) => setQtyInStock(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Add Product
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddProduct;
