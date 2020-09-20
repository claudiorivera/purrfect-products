import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct, fetchAllProducts, deleteProduct } from "../productsSlice";
import "./EditProducts.css";

const EditProducts = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_id, set_id] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [qtyInStock, setQtyInStock] = useState(null);
  const [price, setPrice] = useState(null);
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const openModal = (product) => {
    setIsModalOpen(true);
    set_id(product._id);
    setName(product.name);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setDescription(product.description);
    setQtyInStock(product.qtyInStock);
    setPrice(product.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id,
        name,
        image,
        brand,
        category,
        description,
        qtyInStock,
        price,
      })
    );
    setIsModalOpen(false);
  };

  const handleDelete = (_id) => {
    dispatch(deleteProduct(_id));
    props.history.push("/");
  };

  return (
    <div className="content content-with-margin">
      <div className="product-header">
        <h3>Products</h3>
        <button
          className="button primary"
          onClick={() => {
            openModal({});
          }}
        >
          Add Product
        </button>
      </div>
      {isModalOpen && (
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
                  value={name || ""}
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
                  value={image || ""}
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
                  value={brand || ""}
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
                  value={category || ""}
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
                  value={description || ""}
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
                  value={qtyInStock || 0}
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
                  value={price || 0}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {_id ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="button"
                >
                  Cancel
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button small"
                    onClick={() => {
                      openModal(product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button small"
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditProducts;
