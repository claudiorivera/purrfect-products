import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct, fetchAllProducts, deleteProduct } from "../productsSlice";
import styles from "./EditProducts.module.css";
import { Button } from "../../../app/components/Button";

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
    <div className={styles.contentWithMargin}>
      <div className={styles.productHeader}>
        <h3>Products</h3>
        <Button
          primary
          onClick={() => {
            openModal({});
          }}
        >
          Add Product
        </Button>
      </div>
      {isModalOpen && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.addProductForm}>
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
                <Button primary type="submit">
                  {_id ? "Update" : "Add"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className={styles.productList}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Qty In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.qtyInStock}</td>
                <td>
                  <Button
                    small
                    onClick={() => {
                      openModal(product);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    small
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    Delete
                  </Button>
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
